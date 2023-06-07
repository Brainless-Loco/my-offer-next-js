import React from 'react'

export default function HeadTagElements(props) {
    const {title} = props;
    return (
        <head>
            <title>
                {title}
            </title>
        </head>
    )
}
