import React from 'react'

// The Props interface defines the shape of the props object that will be passed to the component
// La interfaz Props define las props que el componente va a recibir.
interface Props {
  categories: Array<string>
}

export default function Breadcrumble({categories}: Props) {
  return (
    <div className="breadcrumble">
      <span>{categories.length > 1 ? categories.join(" > "): categories}</span>
    </div>
  )
}
