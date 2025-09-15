'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Plus, MoreHorizontal, Edit, Trash2 } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

interface Column {
  id: string
  name: string
  type: 'text' | 'number' | 'date' | 'select' | 'checkbox'
  options?: string[]
}

interface Row {
  id: string
  [key: string]: any
}

interface DatabaseTableProps {
  columns: Column[]
  rows: Row[]
  onAddRow?: () => void
  onEditRow?: (rowId: string) => void
  onDeleteRow?: (rowId: string) => void
  onAddColumn?: () => void
  onEditColumn?: (columnId: string) => void
  onDeleteColumn?: (columnId: string) => void
}

export function DatabaseTable({
  columns,
  rows,
  onAddRow,
  onEditRow,
  onDeleteRow,
  onAddColumn,
  onEditColumn,
  onDeleteColumn,
}: DatabaseTableProps) {
  const [editingCell, setEditingCell] = useState<{ rowId: string; columnId: string } | null>(null)
  const [cellValue, setCellValue] = useState('')

  const handleCellClick = (rowId: string, columnId: string, currentValue: any) => {
    setEditingCell({ rowId, columnId })
    setCellValue(currentValue || '')
  }

  const handleCellSave = () => {
    // TODO: Implement cell update
    setEditingCell(null)
    setCellValue('')
  }

  const handleCellCancel = () => {
    setEditingCell(null)
    setCellValue('')
  }

  const renderCellContent = (row: Row, column: Column) => {
    const value = row[column.id]
    
    if (editingCell?.rowId === row.id && editingCell?.columnId === column.id) {
      return (
        <Input
          value={cellValue}
          onChange={(e) => setCellValue(e.target.value)}
          onBlur={handleCellSave}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleCellSave()
            if (e.key === 'Escape') handleCellCancel()
          }}
          className="h-8 border-none shadow-none p-1"
          autoFocus
        />
      )
    }

    switch (column.type) {
      case 'checkbox':
        return (
          <input
            type="checkbox"
            checked={value || false}
            onChange={() => {/* TODO: Handle checkbox change */}}
            className="h-4 w-4"
          />
        )
      case 'select':
        return (
          <select
            value={value || ''}
            onChange={() => {/* TODO: Handle select change */}}
            className="h-8 border-none bg-transparent"
          >
            <option value="">Select...</option>
            {column.options?.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        )
      case 'date':
        return (
          <span className="text-sm text-slate-600 dark:text-slate-400">
            {value ? new Date(value).toLocaleDateString() : ''}
          </span>
        )
      case 'number':
        return (
          <span className="text-sm font-mono">
            {value ? Number(value).toLocaleString() : ''}
          </span>
        )
      default:
        return (
          <span className="text-sm">
            {value || ''}
          </span>
        )
    }
  }

  return (
    <div className="border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden">
      {/* Header */}
      <div className="bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 p-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Database Table</h3>
          <div className="flex items-center space-x-2">
            <Button size="sm" onClick={onAddColumn}>
              <Plus className="h-4 w-4 mr-2" />
              Add Column
            </Button>
            <Button size="sm" onClick={onAddRow}>
              <Plus className="h-4 w-4 mr-2" />
              Add Row
            </Button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-700">
              {columns.map((column) => (
                <th
                  key={column.id}
                  className="px-4 py-3 text-left text-sm font-medium text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-800 min-w-[150px]"
                >
                  <div className="flex items-center justify-between">
                    <span>{column.name}</span>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-6 w-6">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => onEditColumn?.(column.id)}>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit Column
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => onDeleteColumn?.(column.id)}
                          className="text-red-600"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete Column
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </th>
              ))}
              <th className="px-4 py-3 text-left text-sm font-medium text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-800 w-12">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr
                key={row.id}
                className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/50"
              >
                {columns.map((column) => (
                  <td
                    key={`${row.id}-${column.id}`}
                    className="px-4 py-3 text-sm cursor-pointer"
                    onClick={() => handleCellClick(row.id, column.id, row[column.id])}
                  >
                    {renderCellContent(row, column)}
                  </td>
                ))}
                <td className="px-4 py-3">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-6 w-6">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => onEditRow?.(row.id)}>
                        <Edit className="h-4 w-4 mr-2" />
                        Edit Row
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => onDeleteRow?.(row.id)}
                        className="text-red-600"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete Row
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {rows.length === 0 && (
        <div className="p-8 text-center text-slate-500 dark:text-slate-400">
          <p>No rows yet. Click "Add Row" to get started.</p>
        </div>
      )}
    </div>
  )
}
