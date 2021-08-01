import React from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import Form from 'react-bootstrap/Form';
// import Button from 'react-bootstrap/Button';
import axios from 'axios';


class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      displayName: ' ',
      lon: ' ',
      lat: ' ',
      showMap: false,
      errorMsg : '404 error',
      displayError : ' '

    }
  }


  getTheCity = async (event) => {
    event.preventdefault();

    try{
      let cityName = event.target.city.value;

      let url = `https://eu1.locationiq.com/v1/search.php?key=pk.ec5ac6315b832bc6e01622de00ffe942&q=${cityName}&format=json`;

      let cityResult = await axios.get(url); // sending request to the API, added await to prevent JS from skipping it

      // console.log(cityResult.data[0].display_name); // accessed the data that we need from the API, data[0] is the number of the index that we choosed from the array


      this.setState({
        displayName: cityResult.data[0].display_name,
        lon: cityResult.data[0].lon,
        lat: cityResult.data[0].lat,
        showMap: true


      })

      // let filter = Data.filter((item) => {
      //   if (item.cityName == cityName) {


      //   }
      // });
    }catch{
      this.setState({
        showMap : false, 
        displayError : true

      })
    }


  render(){


    return (


      <>

        <h1>City explorer</h1>

        <Form onSubmit={this.getTheCity}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="text" placeholder="Enter a city name" name="city" />
          </Form.Group>
          <Button variant="primary" type="submit">
            Explore!
          </Button>
        </Form>


        {this.state.displayName}


        {this.state.showMap &&
          <img src={`https://maps.locationiq.com/v3/staticmap?key=pk.ec5ac6315b832bc6e01622de00ffe942&center=${this.state.lat},${this.state.lon}`} alt='map' />

        }



{this.state.displayError && this.props.errorMsg}
      </>

    );
  }


export default App;
