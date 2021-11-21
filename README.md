# Nest JS REST API Tutorial

## Getting started

The first things you'll need are:
- Node installed
- Your favourite Code Editor/IDE

Once you have those setup, let us get started with [nest](https://docs.nestjs.com/).
Install the nest js CLI:
```bash
npm i -g @nestjs/cli
```
Now we can use this to bootstrap our nest project, using the following command:
```bash
nest new <project-name>
```
The command should start scaffolding your app, select your preferred package manager and let the CLI setup and install dependencies.

![nest new.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1636710191263/3S2-uY1zF.png)

Then navigate into your project directory and start the development server.

```bash
cd nest-beginner
npm run start:dev
```
Open a browser and go to [http://localhost:3000/](http://localhost:3000/), and you should see a familiar message

![nest start-dev output.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1636710520944/stYXx-QZG.png)

## Developing our API

To keep this tutorial simple, we are going to use nest CLI's `resource` generator recipe for generating our resources. Go ahead and run the following command to generate the User resource for our API.

![nest generate resource users](https://cdn.hashnode.com/res/hashnode/image/upload/v1636775126042/M_raJfnDu.png)

For this tutorial, we will be developing a REST API, so go ahead and select that option and also let nest generate the CURD entry points to give us some boilerplate code to get started with.

After running the command successfully, you should have the following files in `src/` directory:

![nest resource gen file output.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1636776573892/UN86fZvxv.png)

We start by defining the user entity and the DTOs:

```ts
// user.entity.ts
export class User {
  id: number;
  username: string;
  email: string;
  password: string;
}
```
```ts
// create-user.dto.ts
export class CreateUserDto {
  username: string;
  email: string;
  password: string;
}
```

Since we are using nest generated resource's boilerplate, it makes it simpler as we need to modify just the business logic in the service layer which the controller is already utilising in the API layer. (for this tutorial, we will be storing everything in-memory, do note that in a real-world application we would use a database like MySQL or MongoDB)

```ts
// user.service.ts
@Injectable()
export class UsersService {
  private users: User[] = [];
  private idSeq = 0;

  create(createUserDto: CreateUserDto) {
  }

  findAll(): User[] {
    return this.users;
  }

  findOne(id: number): User {
  }

  update(id: number, updateUserDto: UpdateUserDto): User {
  }

  remove(id: number): User {
  }
}
```

Let us begin with the Get methods first.

```ts
// user.service.ts
  findAll(): User[] {
    return this.users;
  }

  findOne(id: number): User {
    return this.users.find((user) => user.id === id);
  }
```

To create the user, we push the create user DTO and use the idSeq variable to generate a sequential id for it:

```ts
// user.service.ts
  create(createUserDto: CreateUserDto) {
    this.users.push({
      ...createUserDto,
      id: this.idSeq++,
    });
    return this.users.at(-1);
  }
```

To update the user, we first find the index by the id, if the user exists then we overwrite the values with the update user DTO.

```ts
// user.service.ts
  update(id: number, updateUserDto: UpdateUserDto): User {
    const i = this.users.findIndex((user) => user.id == id);
    if (i === -1) return null;
    this.users[i] = {
      ...this.users[i],
      ...updateUserDto,
    };
    return this.users[i];
  }
```

For deleting, we similarly find if the user exists by id, and use the Array `slice` method to delete it from memory:

```ts
// user.service.ts
  remove(id: number): User {
    const i = this.users.findIndex((user) => user.id == id);
    if (i === -1) return null;
    const user = this.users[i];
    this.users.splice(i, 1);
    return user;
  }
```

Now all of our CRUD functionalities are in place and we can test our API, yes you heard that right, we don't need to wire up the controller, set up the module and wire it up with our app, the nest CLI did all of that for us when we generated users resource. So fire up Postman or Insomnia or whatever is your favourite HTTP client.

You can find the source code for this article on this [GitHub repo](https://github.com/cryptus-neoxys/nest-rest-tut).

Feel free to reach out to me on Twitter [@cryptus_neoxys](https://twitter.com/cryptus_neoxys) and connect with me on [LinkedIn](https://www.linkedin.com/in/cryptus-neoxys/).

---

### Refs & Resources

[Nest JS Docs](https://docs.nestjs.com/)
