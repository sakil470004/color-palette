import React, { useEffect, useState } from 'react'
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalendarViewMonthIcon from '@mui/icons-material/CalendarViewMonth';
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import { addToDb, removeFromDb } from '../fakedb/fakedb';
import { useNavigate, useParams } from 'react-router-dom';
import { Alert, Snackbar } from '@mui/material';


function Home() {
    const { colorId } = useParams()
    const navigation = useNavigate()
    // snackbar code start
    const [open, setOpen] = React.useState(false);

    const handleSnackBarClick = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };
    //   end of snackbar code ;
    const [mainColors, setMainColors] = useState([])
    const [subColors, setSubColors] = useState([]);
    const [isSubColorOpen, setIsSubColorOpen] = useState(false);
    const [currentColumn, setCurrentColumn] = useState(-1);
    const [isLockOpen, setIsLockOpen] = useState([false, false, false, false, false])
    const [isStar, setIsStar] = useState([false, false, false, false, false])

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        handleSnackBarClick()
    }
    const handleCurrentColumnColor = (text) => {
        copyToClipboard(text);
        setSubColors([]);
        setCurrentColumn(-1);
        setIsSubColorOpen(false)
    }
    const handleSetLock = (index) => {
        let newArray = [...isLockOpen];
        newArray[index] = true;
        setIsLockOpen(newArray)
    }
    const handleSetStar = (index, id) => {
        let newArray = [...isStar];
        newArray[index] = true;
        addToDb(id)
        setIsStar(newArray)
    }
    const handleSetUnStar = (index, id) => {
        let newArray = [...isStar];
        newArray[index] = false;
        removeFromDb(id)
        setIsStar(newArray)
    }
    const handleSetUnlock = (index) => {
        let newArray = [...isLockOpen];
        newArray[index] = false;
        setIsLockOpen(newArray)
    }
    const handleSubColor = (hexString, index) => {
        let num = parseInt(hexString, 16);
        let arr = []
        for (let i = 0; i < 12; i++) {
            let newHexString = (num).toString(16);
            arr.push(newHexString);
            num = num - 15;

        }
        setCurrentColumn(index)
        setSubColors(arr)
        setIsSubColorOpen(true);
    }
    const createColor = () => {
        let arr = []
        for (let i = 0; i < 5; i++) {
            // hex code are form from 0 to 16777215
            if (isLockOpen[i]) {
                arr.push(mainColors[i])
            } else {
                let random = Math.floor(Math.random() * 16777215)
                let hexString = (random).toString(16);
                arr.push(hexString);
            }
        }
        let url = '/'
        arr.map(ar => {
            url = `${url}-${ar}`
        })
        const newArray = url.split('-')
        // remove the 1st element
        newArray.shift();
        setMainColors(newArray)
        navigation(url)

    }
    const fetchColorFormColorId = () => {
        let newColorId = colorId;
        const newArray = newColorId.split("-");
        // remove the 1st element
        newArray.shift();
        setMainColors(newArray)

    }

    useEffect(() => {
        if (colorId) {
            fetchColorFormColorId()
        } else {
            createColor()
        }
    }, [])
    return (
        <div>
            <div style={{ width: '100%', height: '93vh', display: 'flex', flex: '1' }}>
                {mainColors.map((MC, index) =>
                    <div key={MC}
                        style={{ background: `#${MC}`, width: "100%", height: '100%', color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        {(!isSubColorOpen || index !== currentColumn) ? <div>
                            <p>Hex : {MC}</p>
                            <div>
                                <button
                                    style={{ background: `#${MC}`, border: 'none', cursor: 'pointer', }}
                                    onClick={createColor}
                                ><AutorenewIcon /></button>
                                <button
                                    style={{ background: `#${MC}`, border: 'none', cursor: 'pointer', }}
                                    onClick={() => copyToClipboard(MC)}
                                ><ContentCopyIcon /></button>
                                <button
                                    style={{ background: `#${MC}`, border: 'none', cursor: 'pointer' }}
                                    onClick={() => handleSubColor(MC, index)}
                                ><CalendarViewMonthIcon /></button>
                                {!isLockOpen[index] ? <button
                                    style={{ background: `#${MC}`, border: 'none', cursor: 'pointer' }}
                                    onClick={() => handleSetLock(index)}
                                ><LockOpenIcon /></button> :
                                    <button
                                        style={{ background: `#${MC}`, border: 'none', cursor: 'pointer' }}
                                        onClick={() => handleSetUnlock(index)}
                                    ><LockIcon /></button>}
                                {!isStar[index] ? <button
                                    style={{ background: `#${MC}`, border: 'none', cursor: 'pointer' }}
                                    onClick={() => handleSetStar(index, MC)}
                                ><StarBorderIcon /></button> :
                                    <button
                                        style={{ background: `#${MC}`, border: 'none', cursor: 'pointer' }}
                                        onClick={() => handleSetUnStar(index, MC)}
                                    ><StarIcon /></button>}

                            </div>
                        </div> :
                            <div>
                                {subColors.map(SC => (
                                    <button style={{ background: `#${SC}`, width: "100%", color: 'white', height: '50px', border: 'none', margin: '2px 0px', cursor: 'pointer' }}
                                        onClick={() => handleCurrentColumnColor(SC)}
                                    >
                                        hex : {SC}
                                    </button>
                                ))

                                }
                            </div>
                        }

                    </div>
                )

                }

            </div>
            {/* snackbar code start */}
            <Snackbar open={open} autoHideDuration={1000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    Copied
                </Alert>
            </Snackbar>
            {/* snackbar code end */}
        </div>
    )
}

export default Home