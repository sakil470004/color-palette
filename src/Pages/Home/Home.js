import React, { useEffect, useState } from 'react'
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalendarViewMonthIcon from '@mui/icons-material/CalendarViewMonth';

function Home() {
    const [mainColors, setMainColors] = useState([])



    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
    }
    const createColor = () => {
        let arr = []
        for (let i = 0; i < 5; i++) {
            // hex code are form from 0 to 16777215
            let random = Math.floor(Math.random() * 16777215)
            let hexString = (random).toString(16);
            arr.push(hexString);
        }
        setMainColors(arr)

    }

    useEffect(() => {
        createColor()
    }, [])
    return (
        <div>

            <div style={{ width: '100%', height: '100vh', display: 'flex', flex: '1' }}>
                {mainColors.map(MC =>
                    <div key={MC}
                        style={{ background: `#${MC}`, width: "100%", height: '100%', color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <div>
                            <p>Hex : {MC}</p>
                            <div>
                                <button
                                    style={{ background: `#${MC}`, border: 'none', cursor: 'pointer', }}
                                    onClick={() => copyToClipboard(MC)}
                                ><ContentCopyIcon /></button>
                                <button
                                    style={{ background: `#${MC}`, border: 'none', cursor: 'pointer' }}
                                    
                                ><CalendarViewMonthIcon /></button>
                            </div>
                        </div>
                    </div>
                )

                }
            </div>
        </div>
    )
}

export default Home