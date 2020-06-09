import React from 'react'
import Button from './Button';

class Contact extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            nombre: '',
            numero: '',
            direccion: ''
        }

        this.handleSave = this.handleSave.bind(this);
        this.handleChange = this.handleChange.bind(this);

        this.nombreRef = React.createRef();
        this.numeroRef = React.createRef();
        this.direccionRef = React.createRef();

    }

    componentDidUpdate = (prevProps) => {
        if (this.props.index !== prevProps.index) {
            this.setState({
                nombre: this.props.contacto.nombre,
                numero: this.props.contacto.numero,
                direccion: this.props.contacto.direccion
            });
        }
      }

    handleChange = (event) => {
        if(this.props.index >= 0) {
            this.setState({
                [event.target.id]: event.target.value,
                [event.target.id]: event.target.value,
                [event.target.id]: event.target.value
            });        
        } else{
            this.setState({
                nombre: this.nombreRef.current.value,
                numero: this.numeroRef.current.value,
                direccion: this.direccionRef.current.value
            });
        }
    }

    handleSave = (event) => {
        event.preventDefault();
        // Validar si el nombre no viene vacío
        if(this.state.nombre.trim() !== '' &&
            this.state.numero.trim() !== '' &&
            this.state.direccion.trim() !== '') {
            this.props.onSave(this.state);
            
            this.setState({
                numero: '',
                nombre: '',
                direccion: ''
            });

            // Se limpia el formulario
            event.currentTarget.reset();

        }
    }

    

    render() {
        const nombre = this.state.nombre;
        const numero = this.state.numero;
        const direccion = this.state.direccion;

        return (
            <form onSubmit={this.handleSave}>

                { !this.props.editing &&
                    <div className="form-group">
                        <label htmlFor="nombre">Nombre:</label>
                        <input id="nombre" type="text" className="form-control" 
                            placeholder="Ingrese nombre" ref={this.nombreRef}
                            onChange={this.handleChange}></input>
                    </div>
                }

                { !this.props.editing &&
                    <div className="form-group">
                        <label htmlFor="numero">Número:</label>
                        <input id="numero" type="text" className="form-control" 
                            placeholder="Ingrese número" ref={this.numeroRef} 
                            onChange={this.handleChange}></input>
                    </div>
                }

                { !this.props.editing &&
                    <div className="form-group">
                        <label htmlFor="direccion">Dirección:</label>
                        <input id="direccion" type="text" className="form-control" 
                            placeholder="Ingrese dirección" ref={this.direccionRef} 
                            onChange={this.handleChange}></input>
                    </div>
                }

                

                { this.props.editing && 
                    <div className="form-group">
                        <label htmlFor="nombre">Nombre a editar:</label>
                        <input id="nombre" type="text" className="form-control" 
                            placeholder="Ingrese nombre" value={nombre}
                            onChange={this.handleChange} ></input>
                    </div>
                }

                { this.props.editing && 
                    <div className="form-group">
                        <label htmlFor="numero">Número a editar:</label>
                        <input id="numero" type="text" className="form-control" 
                            placeholder="Ingrese numero" value={numero}
                            onChange={this.handleChange} ></input>
                    </div>
                }

                { this.props.editing && 
                    <div className="form-group">
                        <label htmlFor="direccion">Dirección a editar:</label>
                        <input id="direccion" type="text" className="form-control" 
                            placeholder="Ingrese dirección" value={direccion}
                            onChange={this.handleChange} ></input>
                    </div>
                }
    
                <Button type="submit" className="btn btn-primary">Guardar</Button>
            </form>
        );
    }
    
}

export default Contact;