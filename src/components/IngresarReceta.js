import React, { Component } from 'react'
import axios from 'axios'
import { createReceta } from '../converters/RecetaConverter'
import swal from 'sweetalert'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowAltCircleLeft, faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import Main2 from  './Main2'

class IngresarReceta extends Component {
    state = {
      form: {
        id: '',
        value: '',
        code: '',


        
      },
      error: false,
      errorMsg: '',
      measures:[],
      products:[]
    }
  
    manejadorChange = async (e) => {
      await this.setState({
        form: {
          ...this.state.form,
          [e.target.name]: e.target.value
        }
      })
    }
  
    manejadorSubmit = (e) => {
      e.preventDefault()
    }
  
    post = () => {
      let id = this.props.match.params.id;  
      let url = ("https://siglo-xxi-products.azurewebsites.net/Products/v1/menu/"+ id + "/recipes")
      const body = createReceta(this.state.form)
      console.log(body)
      axios
        .post(url, body)
        .then((response) => {
          swal('Receta ingresada', 'Receta ingresada con éxito.', 'success')
          console.log(response.data)
          this.props.history.push('/recetas')   
        })
        .catch((error) => console.log(error.response.data))
    }
  
    componentDidMount() {     
 axios
        .get("https://siglo-xxi-products.azurewebsites.net/Products/v1/measures")
        .then((response) =>
          this.setState({
            form: { code: response.data.measures[0].code },
            measures: response.data.measures
          })
        )

      axios
      .get("https://siglo-xxi-products.azurewebsites.net/Products/v1/products")
      .then((response) => this.setState({
        form: { id: response.data.products[0].id },
        products: response.data.products
      })
    )

    }
  
    numeros(e) {
      const re = /[0123456789]+/g;
      if (!re.test(e.key)) {
        e.preventDefault();
      }
    }


    
    clickCopy(){
      
     
    }





    
  
    render() {
      return (
        <React.Fragment>
          <Main2></Main2>
          <br />
  
          <div className='container'>
            <a id='volver' className='btn btn-dark' href='/recetas'>
              {' '}
              <FontAwesomeIcon icon={faArrowAltCircleLeft} /> Volver
            </a>
            <hr></hr>
            <h3  id="inreceta">
              <strong >Agregar receta</strong>
            </h3>
          </div>
          <br />
          <div className='container'>
            <form className='form-horizontal' onSubmit={this.manejadorSubmit}>
      


       


      {/* empieza el contenedor */}
            <div className="contenedor1">



<div>
<label>Producto  </label>
              <select
                  className="form-select"
                  aria-label="default select example" 
                  name="id"
                  onChange={this.manejadorChange}
                >
               <option selected>Seleccionar producto</option>  
                  {this.state.products.map((products) => {
                    return <option key={products.id} value={products.id}>{products.name}</option>
                  })}
                </select> 
</div>

<div>
<label style={{ marginLeft: "10px" }}  >Medida </label>
                <select
                   style={{ marginLeft: "10px" }} 
                    className="form-select"
                    aria-label="default select example" 
                    name="code"
                    onChange={this.manejadorChange}
                  >
                  <option selected>Seleccionar medida</option>  
                    {this.state.measures.map((measures) => {
                      return <option key={measures.code} value={measures.code}>{measures.name}</option>
                    })}
                  </select>
</div>

<div>
<label style={{ marginLeft: "20px" }} >Cantidad </label>
                  <input
                   style={{ marginLeft: "20px" }} 

                    className='form-control'
                    name='value'
                    placeholder='Cantidad'
                    type='text'
                    onChange={this.manejadorChange}
                    onKeyPress={(e) => this.numeros(e)}
                    maxLength={3}
                  />
</div>


<div>

<button
                style={{marginTop:"35px"}}
                type='button'
                className='btn btn-success'
                onClick={ () => this.clickCopy() }
             >
                <FontAwesomeIcon icon={faPlusCircle}/>
              </button>


</div>

</div>








             
  <br></br>
              <button
                type='submit'
                className='btn btn-primary'
                style={{ marginRight: '10px' }}
                onClick={() => this.post()}>
                Agregar receta
              </button>
            </form>
          </div>
        </React.Fragment>
      )
    }
  }
  
  export default IngresarReceta;