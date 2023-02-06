import React from 'react'

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
