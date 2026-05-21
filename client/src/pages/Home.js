import { useEffect, useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";



function Home() {

    const [books, setBooks] = useState([]);
    const navigate = useNavigate();

    const fetchBooks = async () => {

        try {

            const res = await API.get("/books");

            setBooks(res.data);

        } catch (err) {

            console.log(err);

        }

    };

    useEffect(() => {
        fetchBooks();
    }, []);



    return (
        <div style={{ padding: "20px" }}>

            <h1>📚 Book Platform</h1>

            <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "20px"
            }}>

                {books.map((book) => (

                    <div key={book._id}
                        style={{
                            border: "1px solid #ccc",
                            padding: "10px",
                            borderRadius: "10px"
                        }}
                    >

                        <img
                            src={book.coverImage}
                            alt=""
                            style={{
                                width: "100%",
                                height: "200px",
                                objectFit: "cover"
                            }}
                        />

                        <h3>{book.title}</h3>

                        <p>{book.description}</p>

                        <p>⭐ Votes: {book.votes}</p>

                        <button
                            onClick={async () => {

                                await API.put(
                                    `/books/vote/${book._id}`,
                                    {},
                                    {
                                        headers: {
                                            Authorization:
                                                localStorage.getItem("token")
                                        }
                                    }
                                );

                                fetchBooks();

                            }}
                        >
                            Vote ⭐

                            onClick={() => navigate(`/book/${book._id}`)}
                        </button>

                    </div>

                ))}

            </div>

        </div>
    );
}

export default Home;