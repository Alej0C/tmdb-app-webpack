import { StarFill, Star as StarEmpty } from "react-bootstrap-icons"

const FiveStartRating = ({ rating }) => { // rating=4.45

    // Declare start icon array
    const starList = [];

    // Store number of filled stars
    const StarFillCount = Math.floor(rating); // 4

    // Store if yes o no there is a half start
    const hasHalfStar = rating - parseInt(rating) >= 0.5; // 4.45-4=0.45>=0.5=false

    // Store the number of empty stars
    const emptyStartCount = 5 - StarFillCount - (hasHalfStar ? 1 : 0); // 5-4=1-0=1

    // Push the filled start icons 
    for (let i = 1; i <= StarFillCount; i++) {
        starList.push(<StarFill key={"star-fill" + i} />);
    }

    // Push the empty start icons 
    for (let i = 1; i <= emptyStartCount; i++) {
        starList.push(<StarEmpty key={"star-empty" + i} />);
    }

    return (
        <div>{starList}</div>
    )
}

export default FiveStartRating