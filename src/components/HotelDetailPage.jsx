import { useEffect } from "react";
import { useParams } from "react-router-dom";

function HotelDetailPage() {
    const {hotelId} = useParams();

    useEffect(
        () => {
            console.log(hotelId);
        },
    [hotelId]);

    return (
        <section>

        </section>
    );
}

export default HotelDetailPage;