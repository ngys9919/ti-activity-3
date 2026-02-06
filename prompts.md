
## ✅ Prompt

Create a full-stack web application for a **Hotel Booking Website** using:

* **Frontend:** HTML, CSS, Vanilla JavaScript (no frameworks)
* **Backend/Database:** Supabase (PostgreSQL)
* Use Supabase JavaScript client via CDN.

The project should be structured as simple static files:

* `index.html` (Landing + Room Listing)
* `bookings.html` (My Bookings page)
* `style.css`
* `script.js`

---

### 🎨 1. Landing Page (index.html)

Create a **beautiful, modern, responsive landing page** with:

* A full-width **hero section**

  * Background image of a luxury hotel
  * Heading: “Luxury Stay, Unforgettable Experience”
  * Subheading text
  * CTA button: “Book Now”
* Smooth scrolling to room section
* Modern UI with:

  * Glassmorphism or soft shadow cards
  * Rounded corners
  * Clean typography
  * Responsive layout (mobile-friendly)

---

### 🏨 2. Rooms Section

Below the hero section, display a list of available rooms.

Each room should contain:

* Room name
* Description
* Price per night
* Room image
* “Book This Room” button

Rooms must be fetched dynamically from **Supabase** table named:

```
rooms
```

Table structure:

* id (uuid, primary key)
* name (text)
* description (text)
* price (numeric)
* image_url (text)
* created_at (timestamp)

Use Supabase JavaScript client to:

* Fetch rooms on page load
* Render them dynamically as cards

---

### 📅 3. Booking Form

When user clicks “Book This Room”:

* Show a booking form (modal or separate section)
* Pre-fill selected room
* Fields:

  * Customer Name
  * Check-in Date
  * Check-out Date
  * Hidden room_id
* Validate:

  * All fields required
  * Check-out must be after check-in
* On submit:

  * Insert booking into Supabase

Create Supabase table:

```
bookings
```

Columns:

* id (uuid, primary key)
* room_id (uuid, foreign key to rooms.id)
* customer_name (text)
* check_in (date)
* check_out (date)
* created_at (timestamp)

After successful booking:

* Show success message
* Reset form
* Redirect to `bookings.html`

---

### 📖 4. My Bookings Page (bookings.html)

Create a simple but modern page that:

* Fetches bookings from Supabase
* Joins with rooms table to display:

  * Room name
  * Customer name
  * Check-in
  * Check-out
  * Total nights
  * Total price
* Display as clean booking cards
* If no bookings, show:
  “No bookings yet.”

---


### 🎨 Styling Requirements

* Use modern color palette (navy + gold OR soft beige + white)
* Responsive design (mobile-first)
* Smooth hover effects
* Card animations
* Clean UI similar to Airbnb style
* Use Google Fonts

---

### 🧠 Extra Requirements

* Use modular JavaScript functions
* Separate concerns properly
* Comment the code clearly
* No backend server (fully frontend + Supabase)
* Clean, readable code

---

### ⭐ Bonus (Optional)

If possible, include:

* Loading spinner while fetching data
* Basic availability validation (no overlapping bookings)
* Simple booking confirmation ID display

---

That’s it.
