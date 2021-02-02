import React from 'react'
import Axios from 'axios'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'
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
  // Share,
  ExpandMore,
  MoreVert,
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
  const classes = useStyles()
  const [expanded, setExpanded] = React.useState(false)
  const [list, setList] = React.useState([])

  const handleExpandClick = () => {
    setExpanded(!expanded)
  }


  const getLocalisation = React.useCallback(async () => {
    await Axios.post(`/browsing/geo/${props.match.params.id}`).then((res) => {
      setCord(res.data)
    })
  }, [props.match.params.id])

  React.useEffect(() => {
    if (cord.length) {
      Axios.post(`/browsing/${props.match.params.id}`, {
        cord: cord,
      }).then(res => {
        setList(res.data)
      })
    } else getLocalisation()
  }, [cord, getLocalisation, props.match.params.id])

  const handelLike = (event, idLiker, idLiked) => {
    event.preventDefault()
    Axios.post(`/browsing/likes/${idLiker}`, {idLiked: idLiked}).then(res => {
      // console.log(res.data)
      if (res.data.status) {
        const newList = list.filter((item) => item.id !== idLiked)
        setList(newList)
      }
    })
  }

  return (
    <Container className={classes.copy} component='main' maxWidth='xs'>
      {
        list && list.map((el, key) => {
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
                    <MoreVert />
                  </IconButton>
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
                <Typography variant='body2' color='textSecondary' component='p'>
                  {el.bio}
                </Typography>
              </CardContent>
              <CardActions disableSpacing>
                <IconButton aria-label='add to favorites' onClick={event => handelLike(event, props.match.params.id, el.id)}>
                  <Favorite />
                </IconButton>
                {/* <IconButton aria-label='share'>
                  <Share />
                </IconButton> */}
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
                  {'Age: ' + el.age + ' distance: ' + el.km.toFixed(2) + 'km'}
                </CardContent>
              </Collapse>
            </Card>
          )}).splice(0, 3)
      }
    </Container>
  )
}

export default Browsing