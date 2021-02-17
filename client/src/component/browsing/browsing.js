import React from 'react'
import Axios from 'axios'
import { makeStyles } from '@material-ui/core/styles'
import Filter from './filter'
import clsx from 'clsx'
import Profil from './profil'
import {
  Card,
  CardHeader,
  // CardMedia,
  CardContent,
  CardActions,
  Collapse,
  Avatar,
  IconButton,
  Typography,
  Container,
} from '@material-ui/core'
import {
  Favorite,
  NotInterested,
  ExpandMore,
} from '@material-ui/icons'

const useStyles = makeStyles((theme) => ({
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
    width: '120%',
    marginRight: '100%', // 16:9
  },
}))

const Browsing = (props) => {
  const [cord, setCord] = React.useState([])
  const [gender, setGender] = React.useState('')
  const classes = useStyles()
  const [expanded, setExpanded] = React.useState(false)
  const [list, setList] = React.useState([])
  const [list1, setList1] = React.useState([])

  const handleExpandClick = () => {
    setExpanded(!expanded)
  }


  const getLocalisation = React.useCallback(async () => {
    await Axios.post(`/browsing/geo/${props.match.params.id}`).then((res) => {
      setGender(res.data.type)
      setCord(res.data.geo)
    })
  }, [props.match.params.id])

  React.useEffect(() => {
    if (cord.length) {
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
        const newList = list.filter((item) => item.id !== idLiked)
        setList1(newList)
      }
    })
  }

  const handelDeslike = (event, idLiker, idLiked) => {
    event.preventDefault()
    Axios.post(`/browsing/deslike/${idLiker}`, {idLiked: idLiked}).then(res => {
      if (res.data.status) {
        const newList = list.filter((item) => item.id !== idLiked)
        setList1(newList)
      }
    })
  }

  return (
    <Container className={classes.copy} component='main' maxWidth='xs'>
      <Filter setList1={setList1} list={list}/>
      {list1 && list1.map((el, key) => {
            return (
              <Card key={key} className={classes.root}>
                <CardHeader
                  avatar={
                    <Avatar aria-label='recipe' className={classes.avatar}>
                      profil
                    </Avatar>
                  }
                  action={
                    <IconButton aria-label='settings'>
                      <Profil visitor={props.match.params.id} visited={el.id} element={el}/>
                    </IconButton>
                    // add the ppop up component here so show profil and added to history table databse
                  }
                  title={el.userName}
                  subheader={el.firstName + ' ' + el.lastName}
                />
                {/* <CardMedia
                className={classes.media}
                image='/static/images/cards/paella.jpg'
                title='Paella dish'
              /> */}

                <CardContent>
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
                    aria-label='NotInterested'
                    onClick={(event) =>
                      handelDeslike(event, props.match.params.id, el.id)
                    }
                  >
                    <NotInterested />
                  </IconButton>
                  <IconButton
                    className={clsx(classes.expand, {
                      [classes.expandOpen]: expanded,
                    })}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label='show more'
                  >
                    <ExpandMore />
                  </IconButton>
                </CardActions>
                <Collapse in={expanded} timeout='auto' unmountOnExit>
                  <CardContent>
                    <Typography paragraph>More :</Typography>
                    {'Age: ' +
                      el.age +
                      ' distance: ' +
                      el.km.toFixed(2) +
                      'km  gender :' +
                      el.gender +
                      ' CITY : ' +
                      el.city}
                  </CardContent>
                </Collapse>
              </Card>
            )
          })
          .splice(0, 20)}
    </Container>
  )
}

export default Browsing