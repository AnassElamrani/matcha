import React from 'react'
import Axios from 'axios'
import { makeStyles } from '@material-ui/core/styles'
import Filter from './filter'
import SortComponent from './sort'
import clsx from 'clsx'
import Profil from './profil'
import Map from "./map"
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  // Collapse,
  Avatar,
  IconButton,
  Typography,
  Container,
  Grid,
  Box
} from '@material-ui/core'
import {
  Favorite,
  NotInterested,
  // ExpandMore,
} from '@material-ui/icons'

const useStyles = makeStyles((theme) => ({
  diva: {
    // background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    height: '100vh',
  },
  container: {
    fontFamily: "Comfortaa"
  },
  copy: {
    marginBottom: theme.spacing(8),
    textAlign: 'center',
  },
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  media1: {
    width: '2vw',
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    width: '2vw',
    marginRight: '100%', // 16:9
  },
}))

const Browsing = (props) => {
  const [cord, setCord] = React.useState([])
  const [gender, setGender] = React.useState('')
  const classes = useStyles()
  const [list, setList] = React.useState([])
  const [list1, setList1] = React.useState([])

  const getLocalisation = React.useCallback(async () => {
    await Axios.post(`/browsing/geo/${props.match.params.id}`).then((res) => {
      setGender(res.data.type)
      setCord(res.data.geo)
    })
  }, [props.match.params.id])

  React.useEffect(() => {
    if (cord.length) {
      console.log("test")
      Axios.post(`/browsing/${props.match.params.id}`, {
        cord: cord,
        gender: gender,
      }).then((res) => {
        setList(res.data)
        setList1(res.data)
      })
    } else getLocalisation()
  }, [cord, gender, getLocalisation, props.match.params.id])

  const handelLike = (event, idLiker, idLiked) => {
    event.preventDefault()
    Axios.post(`/browsing/likes/${idLiker}`, {idLiked: idLiked}).then(res => {
      if (res.data.status) {
        const newList = list1.filter((item) => item.id !== idLiked)
        setList1(newList)
      }
    })
  }

  const handelDeslike = (event, idLiker, idLiked) => {
    event.preventDefault()
    Axios.post(`/browsing/deslike/${idLiker}`, {idLiked: idLiked}).then(res => {
      if (res.data.status) {
        const newList = list1.filter((item) => item.id !== idLiked)
        setList1(newList)
      }
    })
  }

  // const handelTest = (e) => {
  //   setList1(list1.sort((a, b) => {return a.age - b.age}))
  //   // setList(list1.sort((a, b) => a.age - b.age))
  //   // setList([])
  //   console.log(list1)
  // }

  return (
    <div className={classes.diva}>
      <Grid container className={classes.container} spacing={6}>
        <Grid item xs={3}>
          {/* <button onChange={handelTest}>sort</button> */}
          <SortComponent setList={setList1} list={list1} />
        </Grid>
        <Grid item xs={5}>
          <Filter setList1={setList1} list={list} />
        </Grid>
        <Grid item xs={4}>
          <Map list={list1} />
        </Grid>
          <Container className={classes.copy} component='main' maxWidth='xs'>
            <Grid item xs={12}>
              {list1 &&
                list1
                  .map((el, key) => {
                    const imageProfil = el.images.split(',')
                    return (
                      <Box m={2}>
                        <Card key={key} className={classes.root}>
                          <CardHeader
                            avatar={
                              <Avatar
                                aria-label='recipe'
                                className={classes.avatar}
                                src={`http://localhost:3001/${imageProfil[0]}`}
                                alt='test'
                              ></Avatar>
                            }
                            action={
                              <IconButton aria-label='settings'>
                                <Profil
                                  visitor={props.match.params.id}
                                  visited={el.id}
                                  element={el}
                                />
                              </IconButton>
                              // add the ppop up component here so show profil and added to history table databse
                            }
                            title={el.userName}
                            subheader={el.firstName + ' ' + el.lastName}
                          />
                          <CardContent>
                            <Typography variant='h6'>Biography :</Typography>
                            <Typography
                              variant='body2'
                              color='textSecondary'
                              component='p'
                            >
                              {el.bio}
                            </Typography>
                          </CardContent>
                          <CardActions disableSpacing>
                            <IconButton
                              aria-label='add to favorites'
                              onClick={(event) =>
                                handelLike(event, props.match.params.id, el.id)
                              }
                            >
                              <Favorite />
                            </IconButton>
                            <IconButton
                              className={clsx(classes.expand)}
                              aria-label='NotInterested'
                              onClick={(event) =>
                                handelDeslike(event, props.match.params.id, el.id)
                              }
                            >
                              <NotInterested />
                            </IconButton>
                            {/* <IconButton
                              className={clsx(classes.expand, {
                                [classes.expandOpen]: expanded,
                              })}
                              onClick={handleExpandClick}
                              aria-expanded={expanded}
                              aria-label='show more'
                            >
                              <ExpandMore />
                            </IconButton> */}
                          </CardActions>
                          {/* <Collapse in={expanded} timeout='auto' unmountOnExit> */}
                          {/* <CardContent>
                              <Typography paragraph>More :</Typography>
                              {'Age: ' +
                                el.age +
                                ' distance: ' +
                                el.km.toFixed(2) +
                                'km  gender :' +
                                el.gender +
                                ' CITY : ' +
                                el.city}
                            </CardContent> */}
                          {/* </Collapse> */}
                        </Card>
                      </Box>
                    )
                  })
                  .splice(0, 20)}
              </Grid>
            </Container>
        </Grid>
      </div>
  )
}

export default Browsing