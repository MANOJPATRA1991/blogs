---
# Page settings
title: Error handling in TypeScript # Define a title of your page
# description:  # Define a description of your page
keywords: # Define keywords for search engines
tags: typescript error-handling
order: 0 # Define order of this page in list of all documentation documents
comments: false # Set to "true" in order to enable comments on this page. Make sure you properly setup "disqus_forum_shortname" variable in "_config.yml"
# Hero section
hero:
    title: Error handling in TypeScript
    last_edit: 11 June 2021
    read_time: 10 minutes
    external_link: https://stackblitz.com/edit/typescript-g85rik?embed=1&file=index.ts
    # text: Automatic Differentiation

footer:
---
## Error handling if not done properly

Errors can be thrown if they occur. So, why the fuss?

Well, not handling errors properly would lead to the following:

- Breaks the regular flow for unknown reasons
- Difficult to track errors
- Can be time consuming

## An ideal error handling approach

To consider an error handling approach to be ideal, it needs to follow three points:

- The caller should be responsible for error handling
- Errors can be handled differently depending on the context of the caller
- The caller has no choice but to handle the error

We will try to check all these points with TypeScript. With TypeScript generic types, it can be achieved. Here we go through one of the approaches.

### Implementation

Let's define a union type `Result<T, E>` of types `Success` and `Error`. The `Result` type is generic and takes two arguments: `T` for the response type and `E` for the error type.

```typescript
export type Result<T, E> = Success<T, E> | Error<T, E>;
```
Next we define the `Success` class as follows:
```typescript
import { IResult, Result } from './types';
import { Error } from './error';

export class Success<T, E> implements IResult<T, E> {
  readonly value: T;

  constructor(value: T) {
    this.value = value;
  }

  isSuccess(): this is Success<T, E> {
    return true;
  }

  isError(): this is Error<T, E> {
    return false;
  }

  map<A>(f: (t: T) => A): Result<A, E> {
    return new Success(f(this.value));
  }

  mapErr<A>(f: (t: E) => A): Result<T, A> {
    return this as any;
  }
}
```
The `Error` class definition is as follows:
```typescript
import { Success } from './success';
import { IResult, Result } from './types';

export class Error<T, E> implements IResult<T, E> {
  readonly error: E;

  constructor(error: E) {
    this.error = error;
  }

  isSuccess(): this is Success<T, E> {
    return false;
  }

  isError(): this is Error<T, E> {
    return true;
  }

  map<A>(f: (t: T) => A): Result<A, E> {
    return this as any;
  }

  mapErr<A>(f: (t: E) => A): Result<T, A> {
    return new Error(f(this.error));
  }
}
```
Both the `Success` and `Error` classes implement the `IResult` interface which is defined as follows:

```typescript
export interface IResult<T, E> {
  isSuccess(): this is Success<T, E>;
  isError(): this is Error<T, E>;
  map<A>(f: (t: T) => A): Result<A, E>;
  mapErr<A>(f: (t: E) => A): Result<T, A>;
}
```

`isSuccess` will return `true` if result is of type `Success` and `false` otherwise.

Similarly, `isError` will return `true` if result is of type `Error` and `false` otherwise.

`map` and `mapErr` are used to transform the response and error respectively.

We also define two functions `success` and `error` to create instances of `Success` and `Error` respectively as shown below:
```typescript
export const success = <T, E>(value: T): Success<T, E> => new Success(value);
export const error = <T, E>(err: E): Error<T, E> => new Error(err);
```
Now, consider we have a function to make API requests as defined below:
```typescript
export const makeApiRequest = async (
  url?: string
): Promise<Result<ResponseData, number>> => {
  try {
    const result = await axios.get(url);
    return success({
      statusCode: result.status,
      responseBody: result.data
    });
  } catch (e) {
    return error(e.response.status as number);
  }
};
```
This functions returns a promise of type `Result<ResponseData, number>`. On success it gets resolved to a `Success` object with it's member `value` of type `ResponseData`. On failure, it gets resolved to an `Error` object with it's member `error` of type `number`.

With that set, let's assume we try to get a todo item by id with the `todoApi.getTodoById` function which internally calls the `makeApiRequest` function as follows:

```typescript
import { ApiError } from './enums/api';
import todoApi from './todos/todoApi';

async function init() {
  // 99 - exists, 9999 - doesn't exist
  const posts = await todoApi.getTodoById(99);
  if (posts.isSuccess()) {
    console.log(posts.value);
  } else {
    // error logic
    console.log(posts.error);
    // Handle each error separately
    switch (posts.error) {
      //
    }
  }
}

init();
```

`await todoApi.getTodoById(99)` will now return an object of type `Result<ResponseData, number>`. We know that `Result` is a union of `Success` and `Error` and since, each of these classes implement the `IResult` interface, we can check for the `isSuccess` or the `isError` method to quickly identify if the result is a success or not. 

Also, TypeScript is smart enough to identify inside the `if` block that `posts` is of type `Success` and `value` exists on this object and it's also able to identify in the `else` block that `posts` is of type `Error` and has the `error` property instead of `value`.

So, this way we can use TypeScript to handle errors more expressively.

With this now, the `init` function is responsible for error handling, it has the freedom to handle errors differently (in this case error is the status code) and it has no choice but to handle the error.

## Resources

[Link to complete code](https://stackblitz.com/edit/typescript-g85rik?embed=1&file=index.ts)