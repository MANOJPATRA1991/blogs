---
# Page settings
title: On Policy Prediction with Approximation - Part 6 # Define a title of your page
description: Least-squared TD, Memory-based methods # Define a description of your page
keywords: Reinforcement Learning # Define keywords for search engines
order: 6 # Define order of this page in list of all documentation documents
comments: false # Set to "true" in order to enable comments on this page. Make sure you properly setup "disqus_forum_shortname" variable in "_config.yml"

# Hero section
hero:
    title: Reinforcement Learning Notes
    text: <h3>Approximate Solution Methods</h3>On Policy Prediction with Approximation
---

## Least-Squares TD

The Least-Squares TD algorithm directly computes *TD* fixed point without any iteration.

1. Data efficient
2. More computational expensive $$\rightarrow O(d^2)$$
3. No $$\alpha$$ required $$\rightarrow$$ never forgets
4. $$\epsilon \rightarrow 0$$ means $$\hat{\mathbf{A}}_t^{-1}$$ can vary wildly
5. $$\epsilon \rightarrow \infty$$ means learning slows down 

![LSTD](https://res.cloudinary.com/de34f8lhj/image/upload/v1598378631/LSTD_gjz3jj.jpg)

Here, $$\mathbf{I}$$ is the identity matrix, and $$\epsilon \mathbf{I}$$, for some small $$\epsilon > 0$$, ensures that $$\hat{\mathbf{A}}_t$$ is always invertible.

The formula used to update $$\hat{\mathbf{A}}_t^{-1}$$ is called *Sherman-Morrison formula*.

## Memory-based Function Approximation

### Difference between parametric approach and memory-based approach

Each update, $$s \mapsto g$$, is a training example used by the learning algorithm to change the parameters
with the aim of reducing the $$\overline{VE}$$. After the update, the training example can be discarded (although it might be saved to be used again). When an approximate value of a state (*query state*) is needed, the function is simply evaluated at that state using the latest parameters produced by the learning algorithm.

Memory-based function approximation methods on the other hand, save training examples in memory as they arrive (or at least save a subset of the examples) without updating any parameters. Then, whenever a query state’s value estimate is needed, a set of examples is retrieved from memory and used to compute a value estimate for the query state. This approach is sometimes called *lazy learning* because processing training examples is postponed until the system is queried to provide an output.

Memory-based function approximation methods are considered as nonparametric as the approximate functions's form is not limited.

<div class="callout callout--info">
    <p>Nonparametric methods produce increasingly accurate approximations of any target function as the number of training examples keep on increasing in memory.</p>
</div>

### How to choose a memory-based method?
1. Selection criteria of stored training examples
2. Usage of selected training examples to respond to a query state

### Types of memory-based methods

#### LOCAL-LEARNING
Local-learning methods approximate a value function only locally in the neighborhood of the current query state.
After the query state is given a value, the local approximation is discarded.

#### 1. Nearest neighbor methods
If the query state is $$s$$, and $$s^{'} \mapsto g$$ is the example in memory in which $$s^{'}$$ is the closest
state to $$s$$, then $$g$$ is returned as the approximate value of $$s$$.

#### 2. Weighted average methods
These methods retrieve a set of nearest neighbor examples and return a weighted average of their target values, where the weights generally decrease with increasing distance between their states and the query state.

#### 3. Locally weighted regression
Locally weighted regression fits a surface to the values of a set of nearest states by means of a parametric approximation method that minimizes a weighted error measure like $$\overline{VE}$$, where the weights depend on distances from the query state. The value returned is the evaluation of the locally-fitted surface at the query state, after which the local approximation surface is discarded.

### How avoiding global approximation can help address the curse of dimensionality?

For a state-space with $$k$$ dimensions, memory required is as follows:

| Tabular method | Memory-based method |
| - | - |
| exponential in $$k$$ | proportional to $$k$$ |

<div class="callout callout--info">
    <p>To accelerate the nearest neighbor search, <em>k</em>-d tree algorithm would be helpful.</p>
</div>

## What's Next?

Next we look at Kernel-based function approximation, followed by the concept of interest and emphasis in on-policy learning.