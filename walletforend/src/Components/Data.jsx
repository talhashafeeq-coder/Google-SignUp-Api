
import React, { useState } from "react";
import { Calendar } from 'primereact/calendar';

export default function IconDemo() {
    const [date, setDate] = useState(null);

    return (
        <div className="card flex flex-wrap gap-3 p-fluid">
            <div className="flex-auto">
                <Calendar id="buttondisplay" value={date} onChange={(e) => setDate(e.value)} showIcon />
            </div>          
        </div>
    )
}
        