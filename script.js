// Modal
const openModalBtn = document.getElementById('openModal');
const closeModalBtn = document.getElementById('closeModal');
const modalOverlay = document.getElementById('modalOverlay');

openModalBtn.onclick = () => modalOverlay.style.display = 'flex';
closeModalBtn.onclick = () => modalOverlay.style.display = 'none';
window.onclick = (e) => { if(e.target === modalOverlay) modalOverlay.style.display = 'none'; }

// Rating selection
let rating = 5;
document.querySelectorAll('.rating-star').forEach(star => {
    star.addEventListener('click', () => {
        rating = star.dataset.rating;
        document.querySelectorAll('.rating-star').forEach(s => s.classList.remove('fas'));
        document.querySelectorAll('.rating-star').forEach(s => {if(s.dataset.rating <= rating) s.classList.add('fas');});
    });
});

// Submit Review
const reviewForm = document.getElementById('reviewForm');
reviewForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('userName').value;
    const text = document.getElementById('reviewText').value;

    const res = await fetch('add_review.php', {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({name,text,rating})
    });
    const data = await res.json();
    if(data.success){ alert('Review Added!'); modalOverlay.style.display='none'; reviewForm.reset(); loadReviews(); }
});

// Load Reviews
async function loadReviews(){
    const res = await fetch('get_reviews.php');
    const reviews = await res.json();
    const reviewCards = document.getElementById('reviewCards');
    reviewCards.innerHTML = '';
    reviews.forEach(r=>{
        reviewCards.innerHTML += `
        <div class="review-card">
            <div class="review-header">
                <div class="review-avatar">${r.name[0]}</div>
                <div class="review-info">
                    <h3>${r.name}</h3>
                </div>
            </div>
            <div class="review-rating">${'★'.repeat(r.rating)+'☆'.repeat(5-r.rating)}</div>
            <div class="review-content">${r.text}</div>
        </div>`;
    });
}
loadReviews();
