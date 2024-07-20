import { Box, Typography } from "@mui/material";
import "./Quote.css"
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';

const Quote = ({animating, currentQuote}) => {
    return (
        <Box className={animating? "animating": ""} id="current-quote">
            <FormatQuoteIcon></FormatQuoteIcon>
            <Typography id="text" variant="h4">
                {currentQuote.quote}
            </Typography>
            <Typography id="author" variant="overline">
                {currentQuote.author}
            </Typography>
        </Box>
    )
}

export default Quote;