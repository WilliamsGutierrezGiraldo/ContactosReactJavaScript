import React from 'react';
import './App.css';
import Button from './components/Button';
import Contact from './components/Contact';
import Search from './components/Search';


class App extends React.Component {

  state = {
    list: [],
    listCopy: [],
    searchText: "",
    indexContactEdit: undefined,
    editing: false,
    editContact: {
      nombre: "",
      numero: "",
      direccion: ""
    }
  }

  handleDelete = index => {
    const list = Object.assign([], this.state.list);
    list.splice(index,1);
    this.setState({ 
      list,
      listCopy : list
     });
  }

  handleEdit = index => {

    this.setState({
      indexContactEdit: index,
      editing: true,
      editContact: {
        nombre: this.state.listCopy[index].nombre,
        numero: this.state.listCopy[index].numero,
        direccion: this.state.listCopy[index].direccion
      }
    });
  }

  handleSave = (contact) =>  {

    if(this.state.editing) {
      const list = [...this.state.listCopy];

      list[this.state.indexContactEdit] = contact;

      this.setState({
        list,
        listCopy: list,
        editing: false,
        indexContactEdit: undefined
      });

    } else {
      var list = [...this.state.listCopy, contact];

      if(this.state.searchText === "") {
        this.setState({
          list,
          listCopy: list
        });
      } else {
        this.setState({ listCopy: list });
      }
    }

    
  }

  handleSearch = e => {
    // Almacena valor del input
    const value = e.target.value;
    const parametro = this.normalizarCadena(e.target.value);

    if(value !== '') {

      var filtro = [];

      for(var contacto of this.state.list) {
        var cadena = this.normalizarCadena(contacto.nombre);
        if(cadena.includes(parametro)) {
          filtro.push(contacto);
        }
      }

      const listFiltered = filtro;

      this.setState({
        [e.target.id]: value,
        list: listFiltered
      });

    } else {
      this.setState({
        [e.target.id]: value,
        list: this.state.listCopy
      });
    }
  }

  normalizarCadena = (cadena) => {
    const str1 = cadena.toLowerCase();
    const cadenaModificada = str1.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    return cadenaModificada;
  }

  ordenarListaPorNombreAsc = () => {
    let list = [...this.state.list];

    list.sort(function (a, b) {
      if(a.nombre < b.nombre) {
        return -1
      }
      if(a.nombre > b.nombre) {
        return 1
      }

      return 0;
    });

    this.setState({
      list
    });
  }

  ordenarListaPorNombreDes = () => {
    let list = [...this.state.list];

    list.sort(function (a, b) {
      if(a.nombre > b.nombre) {
        return -1
      }
      if(a.nombre < b.nombre) {
        return 1
      }

      return 0;
    });

    this.setState({
      list
    });
  }



  render() {
    return (
      <div className="container mt-4">
        <div className="row">
          <div className="col-md-7">
            <Search searchText={this.state.searchText} onSearch={this.handleSearch}/>
            <div className="mt-2">
              {this.state.list.map((contact, index) => (
                <p key={index}>
                  {contact.nombre} - {contact.numero} - {contact.direccion}
                  <Button type="button" className="ml-2 btn btn-danger" 
                    onClick={() => this.handleDelete(index)}>Borrar &times;</Button>

                  <Button type="button" className="ml-2 btn btn-primary" 
                    onClick={() => this.handleEdit(index)}>Editar</Button>
                </p>
              ))}
            </div>
          </div>
          <div className="col-md-5">
            <Contact onSave={this.handleSave} contacto={this.state.editContact} 
              index={this.state.indexContactEdit} editing={this.state.editing}></Contact>
          </div>
        </div>
        <div className="row">
          { this.state.list.length >= 2 &&
            <Button type="button" className="ml-2 btn btn-success"
              onClick={this.ordenarListaPorNombreAsc}>Ordenar Asc.</Button>
          }
          { this.state.list.length >= 2 &&
            <Button type="button" className="ml-2 btn btn-success"
              onClick={this.ordenarListaPorNombreDes}>Ordenar Des.</Button>
          }
        </div>
      </div>
        
      );
  }
  
}

export default App;
