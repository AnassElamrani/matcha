import React from 'react'
import {Typography , Slider} from '@material-ui/core'

function valuetext(value) {
  return `${value} - Old`
}

function fametext(rating) {
  return `${rating} - Fame`
}

function geoText(geo) {
  return `${geo} - Localisation`
}

function tagText(tag) {
  return `${tag} - Tag`;
}

const RangeSlider = (props) =>  {
  const [value, setValue] = React.useState([18, 60])
  const [rating, setRating] = React.useState([0, 1000])
  const [geo, setGeo] = React.useState([0, 300]);
  const [tag, setTag] = React.useState([0, 100]);

  const kit3awad = () => {
    const newList = props.list.filter(
      (item) => item.age >= value[0] && item.age <= value[1]
    );
    const newList1 = newList.filter(
      (item) => item.km >= geo[0] && item.km <= geo[1]
    );
    const newList2 = newList1.filter(
      (item) => item.fameRating >= rating[0] && item.fameRating <= rating[1]
    );
    const newList3 = newList2.filter(
      (item) => item.tag >= tag[0] && item.tag <= tag[1]
    );
    props.setList1(newList3);
  }
  
  const handleChange = (event, newValue) => {
    setValue(newValue)
    kit3awad();
  }

  const handleChange1 = (event, newValue) => {
    setGeo(newValue);
    kit3awad();
  }

  const handleChange2 = (event, newValue) => {
    setRating(newValue)
    kit3awad();
  }

  const handleChange3 = (event, newValue) => {
    setTag(newValue);
    kit3awad();
  };

  return (
    <React.Fragment>
      <Typography id="range-slider" gutterBottom>
        Age Filter :
      </Typography>
      <Slider
        min={18}
        max={60}
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        aria-labelledby="range-slider"
        getAriaValueText={valuetext}
      />

      <Typography id="range-slider2" gutterBottom>
        Location :
      </Typography>
      <Slider
        min={0}
        max={300}
        value={geo}
        onChange={handleChange1}
        valueLabelDisplay="auto"
        aria-labelledby="range-slider2"
        getAriaValueText={geoText}
      />

      <Typography id="range-slider1" gutterBottom>
        Fame Filter :
      </Typography>
      <Slider
        min={0}
        max={1000}
        value={rating}
        onChange={handleChange2}
        valueLabelDisplay="auto"
        aria-labelledby="range-slider1"
        getAriaValueText={fametext}
      />

      <Typography id="range-slider2" gutterBottom>
        Tag in common :
      </Typography>
      <Slider
        min={0}
        max={100}
        value={tag}
        onChange={handleChange3}
        valueLabelDisplay="auto"
        aria-labelledby="range-slider2"
        getAriaValueText={tagText}
      />
    </React.Fragment>
  );
}


export default RangeSlider