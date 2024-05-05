"use client"
import React, { useState } from 'react'
// import the components
import { SpreadsheetData } from './types'
import Sidebar from './components/Sidebar'
import SingleSpreadsheet from './components/SingleSpreadsheet'

import '@copilotkit/react-ui/styles.css'
import { CopilotKit } from '@copilotkit/react-core'
import { CopilotSidebar } from '@copilotkit/react-ui'
import { INSTRUCTIONS } from './instructions'

const HomePage = () => {
  return (
    <CopilotKit runtimeUrl='/api/copilot'>
      <CopilotSidebar
        instructions={INSTRUCTIONS}
        labels={{
          initial: "Welcome to the spreadsheet app! How can I help you?",
        }}
        defaultOpen={true}
        clickOutsideToClose={false}
      >
        <Main/>
      </CopilotSidebar>
    </CopilotKit>
  )
}

const Main = () => {

  // holds the title and data within a spreadsheet
  const [spreadsheets, setSpreadsheets] = useState<SpreadsheetData[]>([
    {
      title: 'SpreadSheet1',
      rows: [
        [{value: ""}, {value: ""}, {value: ""}],
        [{value: ""}, {value: ""}, {value: ""}],
        [{value: ""}, {value: ""}, {value: ""}]
      ]
    }
  ])

  // represents the index of a spreadsheet
  const [selectedSpreadsheetIndex, setSelectedSpreadsheetIndex] = useState(0)

  return (
    <div className="flex">
      <Sidebar
        spreadsheets={spreadsheets}
        selectedSpreadsheetIndex={selectedSpreadsheetIndex}
        setSelectedSpreadsheetIndex={setSelectedSpreadsheetIndex}
      />
      <SingleSpreadsheet
        spreadsheet={spreadsheets[selectedSpreadsheetIndex]}
        setSpreadsheet={(spreadsheet) => {
          setSpreadsheets((prev) => {
            console.log("setSpreadsheet", spreadsheet)
            const newSpreadsheet = [...prev]
            newSpreadsheet[selectedSpreadsheetIndex] = spreadsheet
            return newSpreadsheet
          })
        }}
      />
    </div>
  );
}

export default HomePage