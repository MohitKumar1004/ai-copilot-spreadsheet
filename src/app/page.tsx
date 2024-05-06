"use client"
import React, { useState } from 'react'
// import the components
import { SpreadsheetData } from './types'
import Sidebar from './components/Sidebar'
import SingleSpreadsheet from './components/SingleSpreadsheet'

import '@copilotkit/react-ui/styles.css'
import { CopilotKit, useCopilotAction } from '@copilotkit/react-core'
import { CopilotSidebar } from '@copilotkit/react-ui'
import { INSTRUCTIONS } from './instructions'
import { PreviewSpreadsheetChanges } from './components/PreviewSpreadsheetChanges'
import { canonicalSpreadsheetData } from './utils/canonicalSpreadsheetData'

const HomePage = () => {
  return (
    <CopilotKit runtimeUrl='/api/copilotkit'>
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

  // createSpreadsheet
  useCopilotAction({
    name: 'createSpreadsheet',
    description: 'Create a new spreadsheet',
    parameters: [
      {
        name: 'rows',
        type: 'object[]',
        description: 'The rows of the spreadsheet',
        attributes: [
          {
            name: 'cells',
            type: 'object[]',
            description: 'The cells of the rows',
            attributes: [
              {
                name: 'value',
                type: 'string',
                description: 'The value of the cell'
              }
            ]
          }
        ]
      },{
        name: 'title',
        type: 'string',
        description: 'The title of the spreadsheet'
      }
    ],
    render: (props) => {
      const { rows, title } = props.args
      const newRows = canonicalSpreadsheetData(rows)

      return (
        <PreviewSpreadsheetChanges
          preCommitTitle='Create Spreadsheet'
          postCommitTitle='Spreadsheet created'
          newRows={newRows}
          commit={() => {
            const newSpreadsheet: SpreadsheetData = {
              title: title || 'Untitled Spreadsheet',
              rows: rows || undefined
            }
            setSpreadsheets((prev) => [...prev, newSpreadsheet])
            setSelectedSpreadsheetIndex(spreadsheets.length)
          }}
        />
      )
    },
    handler: ({ rows, title }) => {
      // Do nothing
      // The preview component will optionally handle committing the changes.
    }
  })

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