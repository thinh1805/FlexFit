import "./RatingCoach.css"
export function RatingCoach() {
    return (
        <div id="rating">
            <input type="radio" id="star5" name="rating" defaultValue={5} />
            <label className="full" htmlFor="star5" title="Awesome - 5 stars" />
            <input type="radio" id="star4" name="rating" defaultValue={4} />
            <label className="full" htmlFor="star4" title="Pretty good - 4 stars" />
            <input type="radio" id="star3" name="rating" defaultValue={3} />
            <label className="full" htmlFor="star3" title="Meh - 3 stars" />
            <input type="radio" id="star2" name="rating" defaultValue={2} />
            <label className="full" htmlFor="star2" title="Kinda bad - 2 stars" />
            <input type="radio" id="star1" name="rating" defaultValue={1} />
            <label className="full" htmlFor="star1" title="Sucks big time - 1 star" />
        </div>
    )
}