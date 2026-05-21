import { useEffect, useState } from "react";
import API from "../api/api";

function Recommendations() {

    const [books, setBooks] = useState([]);

    const userId = "USER_ID_HERE"; // later from token

    const fetchRecommendations = async () => {

        try {

            const res = await API.get(
                `/books/recommend/${userId}`
            );

            setBooks(res.data);

        } catch (err) {

            console.log(err);

        }
    };

    useEffect(() => {
        fetchRecommendations();
    }, []);

    return (
        <div style={{ padding: "20px" }}>

            <h2>🤖 Recommended for You</h2>

            {books.map((b) => (
                <div key={b._id}
                    style={{
                        border: "1px solid gray",
                        marginBottom: "10px",
                        padding: "10px"
                    }}
                >
                    <h3>{b.title}</h3>
                    <p>⭐ {b.votes}</p>
                </div>
            ))}

        </div>
    );
}

export default Recommendations;