import { Popover } from 'react-bootstrap';
const CuentaPopover = () => {
    return (
        <Popover id="popover-contained" className='zindex' style={{ minWidth: '400px' }}>
            <Popover.Header as="h3">Inicio de Sesión</Popover.Header>
            <Popover.Body>
                <div>
                    Mis Pedidos
                </div>
            </Popover.Body>
        </Popover>
    )
}
export default CuentaPopover