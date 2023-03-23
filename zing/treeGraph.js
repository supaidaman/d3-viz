// INIT
// ----------------------------
// Load dependent modules
zingchart.MODULESDIR = "https://cdn.zingchart.com/modules/";


// DEFINE CHART LOCATIONS (IDS)
// -----------------------------
// Main chart render location(s)
let chartId = 'myChart';


// CHART DATA
// -----------------------------
let chartData = [
    { id: 'associate', name: 'ASSOCIATE DEAN FOR<br>UNDERGRADUATE<br>MEDICAL EDUCATION', cls: 'dark' },
    { id: 'exdiraa', name: 'EXECUTIVE DIRECTOR<br>FOR<br>ACADEMIC AFFAIRS', cls: 'dark', sibling: 'associate', style: { offsetX: 60 } },
    { id: 'academy', name: 'The Academy And<br>Learning<br>Societies', parent: 'associate', cls: 'middle' },
    { id: 'diracademy', name: 'Director Of<br>The Academy', parent: 'academy', cls: 'middle_round' },
    { id: 'learningsc1', name: 'Learning<br>Society<br>Chief', parent: 'diracademy', cls: 'middle_sround' },
    { id: 'learningsc2', name: 'Learning<br>Society<br>Chief', parent: 'diracademy', cls: 'middle_sround' },
    { id: 'learningsc3', name: 'Learning<br>Society<br>Chief', parent: 'diracademy', cls: 'middle_sround' },
    { id: 'learningsc4', name: 'Learning<br>Society<br>Chief', parent: 'diracademy', cls: 'middle_sround' },

    { id: 'simulation', name: 'Simulation', parent: 'associate', cls: 'light' },
    { id: 'medsimulation', name: 'Medical<br>Director of<br>Simulation', parent: 'simulation', cls: 'light_round' },

    { id: 'justtime', name: 'Just In Time/<br>Chef Complaints<br>And Concerns<br>(JIT/C3)', parent: 'associate', cls: 'dark' },
    { id: 'dirinteg', name: 'Director Of<br>Integration<br>And<br>Inovation', parent: 'justtime', cls: 'dark_round' },
    { id: 'dirjit', name: 'Director Of<br>JIT/C3', parent: 'justtime', cls: 'dark_round' },

    { id: 'officeass', name: 'The Office Of<br>Assesment', parent: 'associate', cls: 'light_' },
    { id: 'directass', name: 'Director Of<br>Assesment', parent: 'officeass', cls: 'light_round_' },

    { id: 'clinicexp', name: 'Clinical<br>Experiences', parent: 'associate', cls: 'middle' },
    { id: 'assisdean', name: 'Assistant Dean<br>For Clinical<br>Experiences', parent: 'clinicexp', cls: 'middle_round' },
    { id: 'earlyced', name: 'Early<br>Clinical<br>Experience<br>Director', parent: 'assisdean', cls: 'middle_sround' },
    { id: 'middleced', name: 'Middle<br>Clinical<br>Experience<br>Director', parent: 'assisdean', cls: 'middle_sround' },
    { id: 'middleassced', name: 'Middle<br>Clinical<br>Experience<br>Associate<br>Director', parent: 'middleced', cls: 'middle_mround' },

    { id: 'lateced', name: 'Late<br>Clinical<br>Experience<br>Director', parent: 'assisdean', cls: 'middle_sround' },
    { id: 'interdir', name: 'Interssesions<br>Director', parent: 'assisdean', cls: 'middle_mround' },
    { id: 'assinterdir', name: 'Associate<br>Director Of<br>Interssesions', parent: 'interdir', cls: 'middle_mround' }
];


// CHART CONFIG
// -----------------------------
let chartConfig = {
    type: 'tree',
    options: {
        aspect: 'tree-down',
        orgChart: true,
        link: {
            lineColor: '#74A535',
            lineWidth: '4px'
        },
        node: {
            hoverState: {
                visible: false
            },
            label: {
                color: '#fff',
                fontSize: '10px'
            }
        },
        'node[cls-dark]': {
            backgroundColor: '#558718',
            borderColor: '#74A637',
            borderRadius: '10px',
            borderWidth: '5px',
            width: '130px',
            height: '75px'
        },
        'node[cls-dark_round]': {
            type: 'circle',
            backgroundColor: '#558718',
            borderColor: '#74A637',
            borderWidth: '5px',
            size: '42px'
        },
        'node[cls-middle]': {
            backgroundColor: '#74A637',
            borderColor: '#578518',
            borderRadius: '10px',
            borderWidth: '5px',
            width: '130px',
            height: '75px'
        },
        'node[cls-middle_round]': {
            type: 'circle',
            backgroundColor: '#74A637',
            borderColor: '#578518',
            borderWidth: '5px',
            size: '46px'
        },
        'node[cls-middle_sround]': {
            type: 'circle',
            backgroundColor: '#74A637',
            borderColor: '#578518',
            borderWidth: '5px',
            size: '38px'
        },
        'node[cls-middle_mround]': {
            type: 'circle',
            backgroundColor: '#74A637',
            borderColor: '#578518',
            borderWidth: '5px',
            size: '42px'
        },
        'node[cls-light]': {
            backgroundColor: '#98C95E',
            borderColor: '#74A637',
            borderRadius: '10px',
            borderWidth: '5px',
            offsetX: '-20px',
            width: '130px',
            height: '75px'
        },
        'node[cls-light_round]': {
            type: 'circle',
            backgroundColor: '#98C95E',
            borderColor: '#74A637',
            borderWidth: '5px',
            offsetX: '-20px',
            size: '45px'
        },
        'node[cls-light_]': {
            backgroundColor: '#98C95E',
            borderColor: '#74A637',
            borderRadius: '10px',
            borderWidth: '5px',
            offsetX: '20px',
            width: '130px',
            height: '75px'
        },
        'node[cls-light_round_]': {
            type: 'circle',
            backgroundColor: '#98C95E',
            borderColor: '#74A637',
            borderWidth: '5px',
            offsetX: '20px',
            size: '45px'
        }
    },
    plotarea: {
        margin: '40px'
    },
    series: chartData
};

// RENDER CHARTS
// -----------------------------
zingchart.render({
    id: chartId,
    data: chartConfig,
    width: '100%',
    height: '650px'
});