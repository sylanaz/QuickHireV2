import React from 'react'
import { Link } from 'react-router-dom'

export const EditBTN = ({id}) => {
  return (
    <div>
      <Link to={`/Create/${id}`}>แก้ไขข้อมูลร้าน</Link>
    </div>
  )
}