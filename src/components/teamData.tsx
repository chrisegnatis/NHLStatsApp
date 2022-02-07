import React from "react";
import { useTable } from "react-table";
import {Column} from "react-table"

interface TeamProps {
    ot : number;
    win : number;
    loss: number;
    
}

export const TeamData: React.FC<TeamProps> = (props): JSX.Element => {

    // var wlo :string[] = ["" + props.ot, "" + ]
    const data = React.useMemo(
        () => [
            {
                col1: props.win.toString(),
                col2: props.loss.toString(),
                col3: props.ot.toString(),
            }],
        []
    )
    
    const columns : readonly Column<{ col1: string; col2: string; col3: string; }>[] = React.useMemo(
        () => [
          {
            Header: 'Wins',
            accessor: 'col1', // accessor is the "key" in the data
          },
          {
            Header: 'Losses',
            accessor: 'col2',
          },
          {
              Header: 'OT',
              accessor: 'col3',
          }
        ],
        []
      )
    const tableInstance = useTable({ columns, data })
 
    const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    } = tableInstance
 
    return (
    // apply the table props
    <table {...getTableProps()} className="bg-black">
        <thead className="">
        {// Loop over the header rows
        headerGroups.map(headerGroup => (
            // Apply the header row props
            <tr {...headerGroup.getHeaderGroupProps()}>
            {// Loop over the headers in each row
            headerGroup.headers.map(column => (
                // Apply the header cell props
                <th {...column.getHeaderProps()}>
                {// Render the header
                column.render('Header')}
                </th>
            ))}
            </tr>
        ))}
        </thead>
        {/* Apply the table body props */}
        <tbody {...getTableBodyProps()}>
        {// Loop over the table rows
        rows.map(row => {
            // Prepare the row for display
            prepareRow(row)
            return (
            // Apply the row props
            <tr {...row.getRowProps()}>
                {// Loop over the rows cells
                row.cells.map(cell => {
                // Apply the cell props
                return (
                    <td {...cell.getCellProps()}>
                    {// Render the cell contents
                    cell.render('Cell')}
                    </td>
                )
                })}
            </tr>
            )
        })}
        </tbody>
    </table>
     )
}