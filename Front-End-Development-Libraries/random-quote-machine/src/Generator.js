import { Box, Button, Card, CardActions, CardContent, Link } from "@mui/material";
import XIcon from '@mui/icons-material/X';
import { useEffect, useState } from "react";
import './Generator.css'
import Quote from "./Quote";

const Generator = () => {
    const quoteJson = "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json";
    const [allQuotes, setAllQuotes] = useState([]);
    const [currentQuote, setCurrentQuote] = useState("");
    const [tweetLink, setTweetLink] = useState("#0");
    const [animating, setAnimating] = useState(false);
    const getAllQuotes = () => {
        return fetch(quoteJson)
            .then((res) => res.json())
            .then((data) => {
                const {quotes} = data;
                setAllQuotes(quotes);
                getOneQuote(quotes);
            })
            .catch((e) => console.log(`Error: ${e}`));
    }
    const getOneQuote = (quotes) => {
        if (animating) {
            return
        }
        startAnimation();
        document.body.style.backgroundColor = generateBgColor();
        if (quotes.length === 0) {
            setTimeout(() => {
                setCurrentQuote({quote: "An error occured, please try again later.", author: "HTTP 503"})
                setTweetLink("#0");
            },
            300);
            return
        }
        const randomNo = Math.floor(Math.random() * quotes.length);
        const newQuote = quotes[randomNo]
        setTimeout(() => {
            setCurrentQuote(newQuote);
            setTweetLink("https://twitter.com/intent/tweet?text=My%20daily%20thought:%0D%0A" + newQuote.quote + "%0D%0A--" + newQuote.author);
        }, 300);
    }

    const startAnimation = () => {
        setAnimating(true);
    }

    const finishAnimation = () => {
        setAnimating(false);
    }

    const generateBgColor = () => {
        let colorStr = "#";
        for (let i = 0; i < 6; i++) {
            colorStr += (Math.floor(Math.random() * 8) + 8).toString(16);
        }
        return colorStr;
    }

    useEffect(() => {
        getAllQuotes();
        setTimeout(() => setAnimating(false), 600);
    }, []);

    return (
        <Card id="quote-box" sx={{padding:"2rem", backgroundColor:"#FFFFFF99", borderRadius: "30px"}}>
            <CardContent>
                <Quote animating={animating} currentQuote={currentQuote} />
            </CardContent>
            <CardActions id="button-box">
                <Link id="tweet-quote" className="twitter-share-button" href={tweetLink} target="_blank">
                    <Button>
                        <XIcon sx={{color: "black"}}></XIcon>
                    </Button>
                </Link>
                <Button id="new-quote" variant="outlined" sx={{ color: "darkcyan", fontWeight:"bold"}} onClick={() => getOneQuote(allQuotes)} onAnimationEnd={finishAnimation}>
                    New quote
                </Button>
            </CardActions>
        </Card>
    )
}

export default Generator;