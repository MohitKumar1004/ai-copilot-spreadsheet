import React from 'react'
import Spreadsheet from 'react-spreadsheet'
import { SpreadsheetData, SpreadsheetRow } from '../types'

interface MainAreaProps {
    spreadsheet: SpreadsheetData
    setSpreadsheet: (spreadsheet: SpreadsheetData) => void
}

const SingleSpreadsheet = ({ spreadsheet, setSpreadsheet }: MainAreaProps) => {
    
    // adds a new row to the spreadsheet
    const addRow = () => {
        const numberOfColumns = spreadsheet.rows[0].length
        const newRow: SpreadsheetRow = []
        for(let i = 0; i < numberOfColumns; i++) {
            newRow.push({ value: "" })
        }
        setSpreadsheet({
            ...spreadsheet,
            rows: [...spreadsheet.rows, newRow]
        })
    }

    // adds a new column to the spreadsheet
    const addColumn = () => {
        const spreadsheetData = [...spreadsheet.rows]
        for(let i = 0; i < spreadsheet.rows.length; i++) {
            spreadsheet.rows[i].push({ value: "" })
        }
        setSpreadsheet({
            ...spreadsheet,
            rows: spreadsheetData
        })
    }

    return (
        <div className="flex-1 overflow-auto p-5">
            {/** -- Spreadsheet title --- */}
            <input
                type='text'
                value={spreadsheet.title}
                className='w-full p-2 mb-5 text-center text-2xl font-bold outline-none bg-transparent'
                onChange={(e) => setSpreadsheet({ ...spreadsheet, title: e.target.value })}
            />
            {/** -- Spreadsheet rows and columns --- */}
            <div className="flex item-start">
                <Spreadsheet
                    data={spreadsheet.rows}
                    onChange={(data) => {
                        console.log('data',data)
                        setSpreadsheet({ ...spreadsheet, rows: data as any })
                    }}
                />
                {/** -- Add column button --- */}
                <button
                    className='bg-blue-500 text-white rounded-lg ml-6 w-8 h-8 mt-0.5'
                    onClick={addColumn}
                >
                    +
                </button>
            </div>
            {/** -- Add row button --- */}
            <button
                className='bg-blue-500 text-white rounded-lg w-8 h-8 mt-5'
                onClick={addRow}
            >
                +
            </button>
        </div>
    )
}

export default SingleSpreadsheet