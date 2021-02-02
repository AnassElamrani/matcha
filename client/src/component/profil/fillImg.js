import React from 'react'
import Axios from 'axios'
import {
    GridListTile,
  GridList,
  CircularProgress,
  Fab,
  Button,
  Grid,
  Typography,
  Container,
} from '@material-ui/core'
import {Alert} from '@material-ui/lab'
import { Add } from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles'
import Size from '../helpers/size'
// import history from "../../history/history";

const useStyles = makeStyles((theme) => ({
  copy: {
    marginBottom: theme.spacing(8),
    textAlign: 'center',
  },
  typo: {
    margin: theme.spacing(7),
  },
  paper: {
    marginTop: theme.spacing(6),
    display: 'flex',
    flexDirection: 'column',
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    color: 'green',
  }
}))

const FillProfil = (props) => {
  const [images, setImages] = React.useState([])
  const [selectedFiles, setSelectedFiles] = React.useState([])
  const [msg, setMsg] = React.useState('')
  const [status, setStatus] = React.useState()
  const [progress, setProgress] = React.useState(0)
  const classes = useStyles(props)
  
  const addImg = async (e, id, props) => {
    e.preventDefault()
    const formData = new FormData()
    for (const key of Object.keys(images)) {
      formData.append('myImage', images[key])
    }
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
      onUploadProgress: (progressEvent) => {
        setProgress(
          Math.round((progressEvent.loaded / progressEvent.total) * 100)
        )
      },
    }
    
    await Axios.post(`base/img/${id}`, formData, config)
      .then((res) => {
          setStatus(res.data.status)
          setMsg(res.data.msgImg)
        if (res.data.status === true)
          props.onlisten(!props.cImg)
      })
      .catch((error) => {})

  }

  const setImage = (e) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files).map((file) =>
        URL.createObjectURL(file)
      )
      const filesToAdd = e.target.files
      setImages([...images, ...filesToAdd])
      setSelectedFiles((prevImages) => prevImages.concat(filesArray))
    }
  }

  const renderImage = (source) => {
    return source.map((photo, iKey) => {
        return (
          <GridListTile key={iKey}>
            <img width='100%' src={photo} alt='imgTest' />
          </GridListTile>
        )
    })
  }
  return (
    <Size>
      <Container className={classes.copy} component='main' maxWidth='xs'>
        <Typography className={classes.typo} component='h1' variant='h5'>
          Add Images :
        </Typography>
        <div className={classes.paper}>
          <form
            method='POST'
            onSubmit={(event) => addImg(event, props.id, props)}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <label htmlFor='upload-photo'>
                  <input
                    style={{ display: 'none' }}
                    multiple
                    id='upload-photo'
                    name='myImage'
                    type='file'
                    accept=".gif,.jpg,.jpeg,.png"
                    onChange={(e) => setImage(e)}
                  />
                  <Fab
                    color='secondary'
                    size='small'
                    component='span'
                    aria-label='add'
                    variant='extended'
                  >
                    <Add /> Upload photo
                  </Fab>
                </label>
                {progress > 0 && progress < 100 && (
                  <CircularProgress color='secondary' value={progress} />
                )}
                <Grid item xs={12}>
                  <GridList
                    cellHeight={165}
                    className={classes.gridList}
                    cols={3}
                    spacing={5}
                  >
                    {selectedFiles && renderImage(selectedFiles)}
                  </GridList>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              {status ? (
                <Alert severity='success'>{msg}</Alert>
              ) : (
                msg && <Alert severity='error'>{msg}</Alert>
              )}
            </Grid>
            <Button
              type='submit'
              fullWidth
              variant='outlined'
              className={classes.submit}
            >
              Add to Profil
            </Button>
          </form>
        </div>
      </Container>
    </Size>
  )
}

export default FillProfil