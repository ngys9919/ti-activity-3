const supabaseUrl = 'https://hkuyxkfwhvaqcibomrls.supabase.co';
const supabaseAnonKey = 'sb_publishable_HTH0qlweKSdjkJOaQ61yIA_EqfKXRtS';

const supabaseClient = supabase.createClient(supabaseUrl, supabaseAnonKey);

// DOM Elements
const roomsGrid = document.getElementById('rooms-grid');
const bookingsList = document.getElementById('bookings-list');
const loadingSpinner = document.getElementById('loading');
const noBookingsMsg = document.getElementById('no-bookings');
const bookingModal = document.getElementById('booking-modal');
const bookingForm = document.getElementById('booking-form');
const closeModalBtn = document.querySelector('.close-modal');

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
    if (roomsGrid) {
        fetchRooms();
    }
    if (bookingsList) {
        fetchBookings();
    }
});

// --- ROOMS LOGIC ---

async function fetchRooms() {
    showLoading(true);
    try {
        const { data: rooms, error } = await supabaseClient
            .from('rooms')
            .select('*')
            .order('price', { ascending: true });

        if (error) throw error;

        renderRooms(rooms);
    } catch (error) {
        console.error('Error fetching rooms:', error.message);
        roomsGrid.innerHTML = `<p class="error">Failed to load rooms. Please try again later.</p>`;
    } finally {
        showLoading(false);
    }
}

function renderRooms(rooms) {
    roomsGrid.innerHTML = rooms.map(room => `
        <div class="room-card">
            <div class="room-image">
                <img src="${room.image_url || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=1000'}" alt="${room.name}">
            </div>
            <div class="room-info">
                <h3>${room.name}</h3>
                <p>${room.description}</p>
                <span class="price-tag">$${room.price} / night</span>
                <button class="btn primary" onclick="openBookingModal('${room.id}', '${room.name}', ${room.price})">Book This Room</button>
            </div>
        </div>
    `).join('');
}

// --- BOOKING LOGIC ---

window.openBookingModal = (roomId, roomName, price) => {
    document.getElementById('room-id').value = roomId;
    document.getElementById('modal-room-name').textContent = `Book ${roomName}`;
    document.getElementById('modal-room-price').textContent = `$${price} per night`;
    bookingModal.style.display = 'block';
};

if (closeModalBtn) {
    closeModalBtn.onclick = () => {
        bookingModal.style.display = 'none';
        bookingForm.reset();
    };
}

window.onclick = (event) => {
    if (event.target == bookingModal) {
        bookingModal.style.display = 'none';
        bookingForm.reset();
    }
};

if (bookingForm) {
    bookingForm.onsubmit = async (e) => {
        e.preventDefault();

        const roomId = document.getElementById('room-id').value;
        const customerName = document.getElementById('customer-name').value;
        const checkIn = document.getElementById('check-in').value;
        const checkOut = document.getElementById('check-out').value;

        // Validation
        if (new Date(checkOut) <= new Date(checkIn)) {
            alert('Check-out date must be after check-in date.');
            return;
        }

        try {
            const { error } = await supabaseClient
                .from('bookings')
                .insert([
                    {
                        room_id: roomId,
                        customer_name: customerName,
                        check_in: checkIn,
                        check_out: checkOut
                    }
                ]);

            if (error) throw error;

            alert('Booking successful!');
            bookingModal.style.display = 'none';
            bookingForm.reset();
            window.location.href = 'bookings.html';

        } catch (error) {
            console.error('Error creating booking:', error.message);
            alert('Booking failed: ' + error.message);
        }
    };
}

// --- MY BOOKINGS LOGIC ---

async function fetchBookings() {
    showLoading(true);
    try {
        const { data: bookings, error } = await supabaseClient
            .from('bookings')
            .select(`
                *,
                rooms (
                    name,
                    price
                )
            `)
            .order('created_at', { ascending: false });

        if (error) throw error;

        if (bookings && bookings.length > 0) {
            renderBookings(bookings);
            noBookingsMsg.classList.add('hide');
        } else {
            bookingsList.innerHTML = '';
            noBookingsMsg.classList.remove('hide');
        }
    } catch (error) {
        console.error('Error fetching bookings:', error.message);
        bookingsList.innerHTML = `<p class="error">Failed to load bookings.</p>`;
    } finally {
        showLoading(false);
    }
}

function renderBookings(bookings) {
    bookingsList.innerHTML = bookings.map(booking => {
        const nights = calculateNights(booking.check_in, booking.check_out);
        const totalPrice = nights * booking.rooms.price;

        return `
            <div class="booking-card">
                <div class="booking-details">
                    <h3>${booking.rooms.name}</h3>
                    <p class="booking-meta">Customer: <strong>${booking.customer_name}</strong></p>
                    <p class="booking-meta">Stay: ${formatDate(booking.check_in)} to ${formatDate(booking.check_out)} (${nights} nights)</p>
                </div>
                <div class="booking-price">
                    <p>Total Price</p>
                    <p class="total">$${totalPrice}</p>
                </div>
            </div>
        `;
    }).join('');
}

// --- UTILS ---

function showLoading(isVisible) {
    if (loadingSpinner) {
        loadingSpinner.style.display = isVisible ? 'block' : 'none';
    }
}

function calculateNights(checkIn, checkOut) {
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diffTime = Math.abs(end - start);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

function formatDate(dateString) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
}
