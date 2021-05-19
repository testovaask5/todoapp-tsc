import { makeStyles } from "@material-ui/core";

export default function createStyle(imageBackground: string) {
    return makeStyles({
        cardHidden: {
            opacity: "0",
            transform: "translate3d(0, -60px, 0)",
        },
        cardHeader: {
            padding: '20px 0',
            textAlign: 'center',
            margin: '-40px 20px 15px 20px',
            background: 'linear-gradient(60deg, #ab47bc, #8e24aa)',
            boxShadow: '0 12px 20px -10px rgb(156 39 176 / 28%), 0 4px 20px 0px rgb(0 0 0 / 12%), 0 7px 8px -5px rgb(156 39 176 / 20%)',
            color: 'white',
            borderRadius: '3px',
            '& h2': {
                fontWeight: 300
            }
        },
        cardBody: {
            padding: "2rem 1.875rem",
            display: "flex",
            flex: "1 1 auto",
            flexDirection: 'column',
            gap: '1rem',
            // paddingTop: '2rem',
            // paddingBottom: '2rem',
        },
        gridContainer: {
            width: "auto",
            height: "100vh",
            zIndex: 2,
            position: 'relative'
        },
        gridItem: {
            paddingRight: "15px",
            paddingLeft: "15px",
        },
        pageHeader: {
            minHeight: "100vh",
            height: "auto",
            display: "inherit",
            position: "relative",
            margin: "0",
            padding: "0",
            border: "0",
            alignItems: "center",
            backgroundImage: `url('${imageBackground}')`,
            backgroundSize: "cover",
            backgroundPosition: "top center",
            "&:before": {
                background: "rgba(0, 0, 0, 0.5)",
            },
            "&:before,&:after": {
                position: "absolute",
                zIndex: "1",
                width: "100%",
                height: "100%",
                display: "block",
                left: "0",
                top: "0",
                content: '""',
            },
        },
    })
}