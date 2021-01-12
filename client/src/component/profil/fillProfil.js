import React, { useEffect } from "react";
import Axios from "axios";
import {
  Collapse,
  Button,
  Grid,
  TextField,
  Typography,
  Container,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
} from "@material-ui/core";
import { Autocomplete }from "@material-ui/lab";
import { makeStyles } from "@material-ui/core/styles";
import Size from "../helpers/size";
// import history from "../../history/history";

const useStyles = makeStyles((theme) => ({
  copy: {
    marginBottom: theme.spacing(8),
    textAlign: "center",
  },
  typo: {
    margin: theme.spacing(7),
  },
  paper: {
    marginTop: theme.spacing(6),
    display: "flex",
    flexDirection: "column",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    color: "green",
  },
}));

const FillProfil = (props) => {
  const [value, setValue] = React.useState('male')
  const [biography, setBio] = React.useState('﴾͡๏̯͡๏﴿')
  const [tag, setTag] = React.useState('#')
  const [allTag, setAllTag] = React.useState([])
  const [errTag, setErrTag] = React.useState('')
  const [open, setOpen] = React.useState(false)
  const classes = useStyles(props)

  // const [errMsg, setErr] = React.useState({});
  //   const [valid, setValid] = useState(false);

  useEffect(() => {
    Axios.post('base/tag').then((res) => {
      setAllTag(res.data)
    })
  }, [])
  const fill = (e, id) => {
    console.log(id)
    e.preventDefault()
    Axios.post(`base/profil/${id}`, {
      gender: value,
      bio: biography,
      tag: tag,
    }).then((res) => {
      console.log(res)
      // let data = { ...res.data.dataErr.msg, ...res.data.dataErr.msgTag };
      // if (res.data.dataErr.status) setErr(data);
      //   else if (res.data.status === "success") setValid(!valid);
    })
  }
  // console.log("errmgs: " + errMsg);
  const handelTag = (e) => {
    setTag(e.target.value)
    if (e.target.value.charAt(0) !== '#')
      setErrTag('Enter a valid tag')
    else
      setErrTag('')
  }
  return (
    <Size>
      <Container className={classes.copy} component='main' maxWidth='xs'>
        <Typography className={classes.typo} component='h1' variant='h5'>
          Fill profil
        </Typography>
        <div className={classes.paper}>
          <form
            method='POST'
            onSubmit={(event) => fill(event, props.match.params.id)}
          >
            <Grid container spacing={2}>
              <Typography variant='subtitle2' gutterBottom color='secondary'>
                {/* {errMsg} */}
              </Typography>
              <Grid item xs={12} sm={6}>
                <TextField
                  label='Biography'
                  multiline
                  rows={3}
                  variant='outlined'
                  value={biography}
                  onChange={(e) => setBio(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Collapse in={open}>
                  <TextField
                    label='Add New Tag'
                    multiline
                    variant='outlined'
                    value={tag}
                    onChange={(e) => handelTag(e)}
                    helperText={errTag}
                    error={errTag !== ''}
                  />
                </Collapse>
                <Button
                  disabled={open}
                  variant="outlined"
                  color="secondary"
                  onClick={() => {
                    setOpen(true);
                  }}
                >
                  New Tag
                </Button>
                <Autocomplete
                  id='combo-box-demo'
                  options={allTag}
                  getOptionLabel={(option) => option.name}
                  style={{ width: 300 }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label='All Tags'
                      variant='outlined'
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl component='fieldset'>
                  <FormLabel component='legend'>Gender</FormLabel>
                  <RadioGroup
                    row
                    aria-label='gender'
                    name='gender1'
                    value={value}
                    onChange={(e) => setValue(e)}
                  >
                    <FormControlLabel
                      value='women'
                      control={<Radio />}
                      label='Women'
                    />
                    <FormControlLabel
                      value='male'
                      control={<Radio />}
                      label='Male'
                    />
                    <FormControlLabel
                      value='both'
                      control={<Radio />}
                      label='Both'
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
            </Grid>
            <Button
              type='submit'
              fullWidth
              variant='outlined'
              className={classes.submit}
            >
              Fill Profil
            </Button>
          </form>
        </div>
      </Container>
    </Size>
  )
};

export default FillProfil;
