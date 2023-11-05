import React, { useState, useEffect } from "react"
import GoogleMap from "@/components/maps"
import axios from "axios"

export default function admin({ board }: { board: any }) {

    const [newBoard, setNewBoard] = useState({ location: [0, 0], name: '' })
    const [boards, setBoards] = useState<any>(board || [])
    console.log(board)



    const handleCoordsChange = (newCoords: any) => {
        console.log(newCoords)
        setNewBoard({ name: newBoard.name, location: [newCoords[0], newCoords[1]] })
    };


    return (
        <div className="w-full h-screen flex items-center justify-start flex-col">
            <form className="w-full flex items-center justify-center flex-col" onSubmit={(e) => e.preventDefault()}>
                <input type='text' className="bg-red-400" value={newBoard.name} onChange={(e) => setNewBoard({ location: [newBoard.location[0], newBoard.location[1]], name: e.target.value })} />
                <button onClick={async () => {
                    if (newBoard.name.length !== 0 && (newBoard.location[0] !== 0 || newBoard.location[1] !== 0)) {
                        setBoards([...boards, newBoard]);
                        try {
                            await axios.post('http://localhost:9000/users/upload-board', { newBoard })
                        } catch (err) {
                            console.log(err)
                        }
                        setNewBoard({ location: [0, 0], name: "" })
                    } else {
                        alert('Alege o locație sau un nume')
                    }
                }}>Adaugă o placă nouă</button>
            </form>
            <br />
            {
                boards?.map((board: any, number: string) => {
                    return (
                        <div>
                            {board.name}
                        </div>
                    )
                })
            }
            <GoogleMap onCoordsChange={handleCoordsChange} />
        </div >
    )
}


export async function getServerSideProps({}) {
    try {
        const response = await axios.get('http://localhost:9000/users/get-boards')
        console.log(response.data.boards)
        return {
            props: {
                board: response.data.boards,
            },
        };
    } catch (error) {
        console.error('Error fetching temperature data:', error);

        return {
            props: {
                board: [],
            },
        };
    }
}