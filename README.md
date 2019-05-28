# testing-strapi
Testing Strapi alpha version to create a node.js driven CMS with GraphQL API.

## Strapi

Strapi code is located in the cms directory.

### Commands

Start MongoDB:

```$ mongod --config /usr/local/etc/mongod.conf```

Start Strapi:

```$ strapi start```

CMS URL:

```http://localhost:1337/admin``` 

### API

#### Login (REST)

POST http://localhost:1337/auth/local

Post body:

```
{
    "identifier": "user@strapi.io",
    "password": "strapiPassword"
}
```

### Get events with all data (GraphQL query)

```
{
  events {
    id
    event_title
    event_date
    event_image {
      url
      name
    }
    talks {
      id
      talk_name
      talk_time
      talk_description
      speakers {
        id
        speaker_name
        speaker_job
        speaker_photo {
          url
          name
        }
        speaker_biography
      }
    }
  }
}

```

### Get events (GraphQL query)

```
{
  events {
    id
    event_title
    event_date
    event_image {
      url
      name
    }
  }
}
```

### Get event by id (GraphQL query)

```
{
  event(id: "5ceced5c85df3bb5e1d47aa0") {
    id
    event_title
    event_date
    event_image {
      url
      name
    }
  }
}
```