import React from 'react'

// La interfaz Props define las props que el componente va a recibir.
interface Props {
  categories: Array<string>
}

export default function Breadcrumbs({categories}: Props) {
  return (
    <div className="breadcrumbs">
      <span>{categories.length > 1 ? categories.join(" > "): categories}</span>
    </div>
  )
}
