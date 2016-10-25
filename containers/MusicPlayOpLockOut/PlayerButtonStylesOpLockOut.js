var btnStyles = {
    button: {
        width: '120px',
        height: '120px',
        boxSizing: 'border-box',
        border:'none',
        backgroundColor: 'transparent' ,
        boxShadow:'none',
    },
    pressedButton: {
        border: 'none',
        backgroundColor: 'transparent',
    },
    disabledButton: {
        background: 'transparent',
        color: '#303030',
        border: 'none',
        pointerEvents: 'none',
    },
};
export default btnStyles;
//
// .Button{
//     width: 105px,
//     height: 85px,
//     box-sizing: border-box,
//     border: 1px solid #000000,
//     backgroundColor: #171717,
//     boxShadow: inset 0px 2px 0px 0px rgba(133,133,133,1),
// }
// .RepeatButton{
//     composese:Button,
//     width: 120px,
//     height: 85px,
// }
// .Button:active{
//     border:2px solid #ffffff,
//     backgroundColor:rgb(0, 89, 107),
// }
//
// .Button:disabled{
//     background:#171717,
//     color:#303030,
//     border:2px solid #000000,
//     pointer-events :none,
// }
// .Button:disabled path{
//     fill:#303030,
// }
//
// .ButtonIcon{
//     width:60px,
//     height:60px,
// }
// .ButtonNormal{
//
// }
// .ButtonSelected{
//     border:none,
//     backgroundColor:#00D4FF,
//     color:#000000,
//     boxShadow:none,
// }