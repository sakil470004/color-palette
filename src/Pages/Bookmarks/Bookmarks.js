import React, { useEffect, useState } from 'react'
import { getStoredCart, removeFromDb } from '../fakedb/fakedb'
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

import DeleteIcon from '@mui/icons-material/Delete';
function Bookmarks() {
    const [storedColor, setStoredColor] = useState([]);

    const handleRemove = (id) => {
        removeFromDb(id)
        refreshUI()
    }
    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
    }
    const refreshUI = () => {
        let object = getStoredCart()
        let newArray = Object.values(object)
        setStoredColor([...newArray])
    }

    useEffect(() => {
        refreshUI()
    }, [])
    return (
        <div>

            {
                storedColor.map(SC =>

                    <div
                        style={{ height: '50px', display: 'flex', justifyContent: 'center', alignItems: 'center', background: `#${SC}` }}
                        key={SC}
                    >
                        hex : {SC}
                        <button
                            style={{ background: `#${SC}`, border: 'none', cursor: 'pointer' }}
                            onClick={() => handleRemove(SC)}
                        ><DeleteIcon /></button>
                        <button
                            style={{ background: `#${SC}`, border: 'none', cursor: 'pointer', }}
                            onClick={() => copyToClipboard(SC)}
                        ><ContentCopyIcon /></button>
                    </div>


                )
            }
        </div>
    )
}

export default Bookmarks