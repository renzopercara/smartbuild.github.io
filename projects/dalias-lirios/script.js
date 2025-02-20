import { h, render } from "https://esm.sh/preact";
import { useEffect, useState } from "https://esm.sh/preact/hooks";

const apiUrl = 'https://script.google.com/macros/s/AKfycbx_I2PP77-PtbxtLqvjWHwYOvkwJQRKr_7heXUcn9rzZ2NyAdJp6mqtyw4vvd0ROYVI/exec';

const rendimientoLabels = {
    'Excelente': ["Excelente", "⭐⭐⭐⭐⭐"],
    'Bueno': ["Bueno", "⭐⭐⭐⭐"],
    'Normal': ["Regular/Normal", "⭐⭐⭐"],
    'Regular': ["Deficiente", "⭐⭐"],
    'Crítico': ["Crítico", "⭐"]
};

const fieldLabels = {
    'actRealizar': "Act. a Realizar",
    'actRealizada': "Act. Realizadas",
    'cantidades': "Cantidades",
    'rendimientoGeneral': "Rendimiento",
    'observaciones': "Observaciones"
};

function Calendar() {
    const [data, setData] = useState([]);
    const [currentWeekStartDate, setCurrentWeekStartDate] = useState(getStartOfWeek(new Date()));
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                setData(data);
                setIsLoading(false);
            })
            .catch(error => {
                console.error("Error fetching data:", error);
                setIsLoading(false);
            });
    }, []);

    function getStartOfWeek(date) {
        const start = new Date(date);
        start.setDate(start.getDate() - start.getDay() + 1);
        return start;
    }

    const getWeekDays = () => {
        return Array.from({ length: 7 }, (_, i) => {
            const date = new Date(currentWeekStartDate);
            date.setDate(currentWeekStartDate.getDate() + i);
            return date;
        });
    };

    const getDayData = (date) => {
        return data.filter(item => new Date(item.fecha).toDateString() === date.toDateString());
    };

    const styles = {
        container: {
            width: "100%",
            maxWidth: "95%",
            margin: "auto",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
            minWidth: '1500px',
            backgroundColor: "white",
            'overflow-x': 'auto',
        },
        headerCell: {
            backgroundColor: 'rgb(23, 65, 95)',
            color: 'white',
            textAlign: 'center',
            fontSize: '1.2rem',
            fontWeight: 'bold',
            padding: '15px',
            fontFamily: 'Arial, sans-serif',
            border: '1px solid #ccc',
            wordWrap: 'break-word',
            whiteSpace: 'normal',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            fontSize: '0.9rem'
        },
        leftCell: {
            backgroundColor: 'rgb(23, 65, 95)',
            color: 'white',
            textAlign: 'center',
            fontSize: '1.1rem',
            fontWeight: 'bold',
            padding: '15px',
            fontFamily: 'Arial, sans-serif',
            verticalAlign: 'middle',
            border: '1px solid #ccc',
            wordWrap: 'break-word',
            whiteSpace: 'normal',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            fontSize: '0.9rem'
        },
        bodyCell: {
            verticalAlign: 'middle',
            border: '1px solid #ccc',
            padding: '10px',
            wordWrap: 'break-word',
            whiteSpace: 'normal',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            fontSize: '0.9rem'
        },
        todayColumn: {
            backgroundColor: '#81C784'
        },
        calendarTitle: {
            fontSize: '2rem',
            color: '#333',
            marginBottom: '20px',
            fontFamily: 'Arial, sans-serif',
            textAlign: "center"
        },
        spinnerContainer: {
            position: "fixed",
            top: "0",
            left: "0",
            width: "100vw",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            zIndex: "9999"
        },
        spinner: {
            fontSize: "1.5rem",
            fontWeight: "bold",
            color: "rgb(23 65 95)",
            paddingTop: '15px',
            paddingLeft: '10px',
        },
        fullWidthTable: {
            width: "100%",
            tableLayout: "fixed",
        },
        actionButtons: {
            display: "flex",
            justifyContent: "center",
            marginBottom: "10px"
        },
        button: {
            backgroundColor: 'rgb(23, 65, 95)',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            padding: '10px 15px',
            fontSize: '1rem',
            margin: '0 5px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'background-color 0.3s',
            boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)"
        },
        buttonHover: {
            backgroundColor: 'rgba(23, 65, 95, 0.8)',
        },
        icon: {
            marginRight: '5px'
        }
    };

    if (isLoading) {
        return h("div", { style: styles.spinnerContainer },
            h("div", { class: "spinner-border", role: "status" },
                h("span", { class: "visually-hidden" })
            ),
            h("p", { style: styles.spinner }, "Cargando datos...")
        );
    }

    return (
        h("div", { class: "container-fluid mt-4", style: styles.container },
            h("h1", { style: styles.calendarTitle }, "Calendario Semanal"),
            h("div", { style: styles.actionButtons },
                h("button", {
                    style: styles.button,
                    onClick: () => setCurrentWeekStartDate(new Date(currentWeekStartDate.setDate(currentWeekStartDate.getDate() - 7))),
                    onMouseOver: e => e.currentTarget.style.backgroundColor = styles.buttonHover.backgroundColor,
                    onMouseOut: e => e.currentTarget.style.backgroundColor = styles.button.backgroundColor
                },
                    h("i", { class: "fas fa-arrow-left", style: styles.icon }),
                    "Semana Anterior"
                ),
                h("button", {
                    style: styles.button,
                    onClick: () => setCurrentWeekStartDate(getStartOfWeek(new Date())),
                    onMouseOver: e => e.currentTarget.style.backgroundColor = styles.buttonHover.backgroundColor,
                    onMouseOut: e => e.currentTarget.style.backgroundColor = styles.button.backgroundColor
                },
                    h("i", { class: "fas fa-home", style: styles.icon }),
                    "Hoy"
                ),
                h("button", {
                    style: styles.button,
                    onClick: () => setCurrentWeekStartDate(new Date(currentWeekStartDate.setDate(currentWeekStartDate.getDate() + 7))),
                    onMouseOver: e => e.currentTarget.style.backgroundColor = styles.buttonHover.backgroundColor,
                    onMouseOut: e => e.currentTarget.style.backgroundColor = styles.button.backgroundColor
                },
                    h("i", { class: "fas fa-arrow-right", style: styles.icon }),
                    "Semana Siguiente"
                )
            ),
            h("table", { class: "table table-bordered table-striped text-center", style: { ...styles.fullWidthTable, borderCollapse: 'collapse' } },
                h("thead", null,
                    h("tr", null,
                        h("th", { style: styles.leftCell }, ""),
                        getWeekDays().map(date =>
                            h("th", {
                                key: date.toISOString(),
                                class: date.toDateString() === new Date().toDateString() ? "bg-warning text-white" : "",
                                style: date.toDateString() === new Date().toDateString() ? { ...styles.headerCell, ...styles.todayColumn } : styles.headerCell
                            },
                                h("div", null,
                                    date.toLocaleDateString('es-ES', { weekday: 'long' }).charAt(0).toUpperCase() +
                                    date.toLocaleDateString('es-ES', { weekday: 'long' }).slice(1),
                                    h("br", null),
                                    date.toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' })
                                )
                            )
                        )
                    )
                ),
                h("tbody", null,
                    Object.keys(fieldLabels).map((field, rowIndex) =>
                        h("tr", { key: rowIndex },
                            h("td", { class: "fw-bold", style: styles.leftCell }, fieldLabels[field]),
                            getWeekDays().map(date => {
                                const dayData = getDayData(date);
                                const value = dayData.length > 0 ? dayData[0][field] : "N/A";

                                return h("td", { key: date.toISOString(), style: styles.bodyCell },
                                    field === "rendimientoGeneral" && rendimientoLabels[value] ?
                                        h("div", null,
                                            h("div", null, rendimientoLabels[value][0]),
                                            h("div", { style: { fontSize: "1.2rem", color: "#FFD700" } }, rendimientoLabels[value][1])
                                        ) :
                                        value.split('\n').map((item, index) => (
                                            h("div", { key: index, style: { fontSize: '0.9rem' } }, item) // Ajusta el tamaño del texto
                                        ))
                                );
                            })
                        )
                    )
                )
            )
        )
    );
}

render(h(Calendar, null), document.getElementById("app"));
