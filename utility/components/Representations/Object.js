import React, { createElement } from 'react'
import * as Representation from './'

export default function RepresentObject({values, align}) {

  const renderObject = () => {
    if (values == null) {
      return createElement(Representation['String'], '' )
    }

    switch(values.constructor) {
      case Array:
        return createElement(Representation['Array'], { values })
      case Object:
        return createElement(Representation['Hash'], { values })
      default:
        values = values.toString()
        return createElement(Representation['String'], { values })
    }
  }

  return (
    renderObject()
  )
}
