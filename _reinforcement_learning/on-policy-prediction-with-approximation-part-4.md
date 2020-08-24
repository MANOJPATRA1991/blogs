---
# Page settings
title: On Policy Prediction with Approximation - Part 4 # Define a title of your page
description: Different ways of feature construction for linear methods  # Define a description of your page
keywords: Reinforcement Learning # Define keywords for search engines
order: 4 # Define order of this page in list of all documentation documents
comments: false # Set to "true" in order to enable comments on this page. Make sure you properly setup "disqus_forum_shortname" variable in "_config.yml"

# Hero section
hero:
    title: Reinforcement Learning Notes
    text: <h3>Approximate Solution Methods</h3>On Policy Prediction with Approximation
---

## Feature Construction for Linear Methods

<div class="callout callout--danger">
    <p><strong>Limitation of linear form</strong> The features could not be represented together (interaction between features is not considered).</p>
</div>

General ways of overcoming this problem are:

### 1. Polynomials
Suppose each state $$s$$ corresponds to $$k$$ numbers, $$s_{1}, s_{2}, \ldots, s_{k},$$ with each $$s_{i} \in \mathbb{R}$$. For this $$k$$-dimensional state space, each order-$$n$$ polynomial-basis feature $$x_{i}$$ can be written as

$$
x_{i}(s)=\prod_{j=1}^{k} s_{j}^{c_{i, j}}
$$

where each $$c_{i, j}$$ is an integer in the set $$\{0,1, \ldots, n\}$$ for an integer $$n \geq 0 $$. These features make up the order-$$n$$ polynomial basis for dimension $$k$$, which contains $$(n+1)^{k}$$ different features.

#### Example

Let $$s$$ be a $$k = 2$$ dimensional state with $$s_1 \in \mathbb{R}$$ and $$s_2 \in \mathbb{R}$$. Then, $$x(s) = (s_1, s_2)^T$$. To understand the feature interaction, $$x(s)$$ can be represented as a four-dimensional feature vector as $$(1, s_1, s_2, s_1s_2)^T$$.

<div class="callout callout--danger">
    <p>Polynomials are not recommended for online learning.</p>
</div>

### 2. Fourier Basis

Suppose each state $$s$$ corresponds to a vector of $$k$$ numbers, $$s = (s_1, s_2, ..., s_k)^T$$, with each $$s_i \in [0, 1]$$. The i<sup>th</sup> feature in the order-n Fourier cosine basis can then be written as 

$$x_i(s) = cos(\pi s^Tc^i)$$ 

where $$c^i = (c_1^i, . . . , c_k^i)^T$$, with $$c_j^i \in {0, . . . ,n}$$ for $$j = 1, . . . ,k$$ and $$i = 0, . . . , (n+1)^k$$.

This defines a feature for each of the $$(n + 1)^k$$ possible integer vectors $$c^i$$. 

The inner product $$s^Tc^i$$ has the effect of assigning an integer in $${0, . . . ,n}$$ to each dimension of $$s$$. This integer determines the feature’s frequency along that dimension. 

#### Example

$$k = 2$$, $$s = (s_1, s_2)^T$$, with each $$c^i = (c_1^i, c_2^i)^T$$

| c | Feature |
| - | - |
| $$(0, 0)^T$$ | constant over both dimensions |
| $$(0, 1)^T$$ | constant over first dimension |
| $$(1, 0)^T$$ | constant over second dimension |
| $$(1, 1)^T$$ | varies across both dimensions |

The values of $$c_1$$ and $$c_2$$ determine the frequency along each dimension, and their ratio gives the direction of the interaction.

With Fourier cosine features, step-size parameter should be set as follows:

$$
\alpha_i = \left\{ \begin{array}{rcl}\alpha  & \mbox{for} & each & c_j^i = 0 \\ \surd{\overline{(c_1^i)^2 + ... + (c_k^i)^2}} & \mbox{otherwise} \\ \end{array}\right.
$$

<div class="callout callout--success">
    <p><strong>Advantage of Fourier basis</strong> Easy to select features by setting the c<sup>i</sup> vectors to account for suspected interactions among the state variables and by limiting the values in the c<sup>j</sup> vectors so that the approximation can filter out high frequency components considered to be noise.</p>
</div>

<div class="callout callout--danger">
    <p><strong>Diadvantage of Fourier basis</strong> Since, Fourier features are non-zero over the entire state space, they represent global properties of states, which can make it difficult to find good ways to represent local properties.</p>
</div>

### 3. Coarse Coding
<div style="text-align: center;">
    <img src="https://res.cloudinary.com/de34f8lhj/image/upload/v1598129899/coarse_coding_c1bnfj.jpg">
</div>


**Binary feature**:
Let features be represented as circles in state space.

| State location | Feature value |
| - | - |
| Inside the circle | 1 (present) |
| Outside the circle | 0 (absent) |

Representing a state with features that overlap in this way is known as *coarse coding*.

Each circle represents a component of the weight vector $$w$$.

<div class="callout callout--info">
    <p>Initial generalization from one point to another is indeed controlled by the size and shape of the receptive fields, but acuity, the finest discrimination ultimately possible, is controlled more by the total number of features.</p>
</div>

<div class="callout callout--info">
    <p>Receptive field shape tends to have a strong effect on generalization but little effect on asymptotic solution quality.</p>
</div>

<div style="text-align: center;">
    <img src="https://res.cloudinary.com/de34f8lhj/image/upload/v1598129899/feature_width_vs_generalization_qhwotv.jpg">
</div>

### 4. Tile Coding

In tile coding the receptive fields of the features are grouped into partitions of the state space. Each such partition is called a *tiling*, and each element of the partition is called a *tile*.

<div style="text-align: center;">
    <img src="https://res.cloudinary.com/de34f8lhj/image/upload/v1598129899/tile_coding_fcb74o.jpg">
</div>

In this image, there are $$4 * 4 * 4 = 64$$ components, all of which will be $$0$$ except for the four corresponding to the tiles that $$s$$ falls within.

The overall number of features that are active at one time is the same for any state.

Total number of features present = Total number of tilings

#### Choosing $$\alpha$$
If $$n$$ is the number of tilings, then, 
1. choosing $$\alpha = \frac{1}{n}$$ results in exactly one-trial learning.
2. choosing $$\alpha = \frac{1}{10n}$$ results in the estimate for the trained state to move one-tenth of the way to the target in one update, and neighboring states will be moved less, proportional to the number of tiles they have in common.

<div class="callout callout--success">
    <p>Tile coding gains computational advantages from its use of binary feature vectors, i.e., each component has a value of either 0 or 1.</p>
</div>

<div class="callout callout--info">
    <p>Generalization occurs to states other than the one trained if those states fall within
any of the same tiles, proportional to the number of tiles in common.</p>
</div>

#### Tiling offset 
If $$w$$ denotes the tile width and $$n$$ the number of tilings, then $$\frac{w}{n}$$ is a fundamental unit of tiling offset.

#### Recommendations for displacement vectors

For a continuous space, with $$k$$ dimensions, $$n$$ tilings,
1. Use the first odd integers $$(1, 3, 5, 7, ..., 2k - 1)$$ as displacement vectors
2. $$n = 2^{int} \geq 4k$$, where $$int$$ is any integer

**Example**:

$$k = 2$$ and $$n = 2^3 \geq 4k$$, then, displacement vectors for the first four tilings are $$(0, 0, 0)$$, $$(1, 3, 5)$$, $$(2, 6, 10)$$ and $$(3, 9, 15)$$.

#### Shape of the tiles

1. Tiles that are elongated along one dimension will promote generalization along that dimension.
2. Irregular tilings are rarely used in practice.
3. In practice, it is often desirable to use different shaped tiles in different things.

### 5. Radial Basis Functions

Each feature can take up any value in the interval [0, 1], reflecting various degrees to which the feature is present.

A typical RBF feature, $$x_i$$, has a Gaussian (bell-shaped) response $$x_i(s)$$ dependent only on the distance between the state, $$s$$, and the feature’s prototypical or center state, $$c_i$$, and relative to the feature’s width, $$\sigma_i$$:

$$
    x_i(s) \doteq \exp(\frac{\parallel s - c_i \parallel^2}{2\sigma_i^2})
$$

<div style="text-align: center;">
    <img src="https://res.cloudinary.com/de34f8lhj/image/upload/v1598129899/rbf_ujkvti.jpg">
</div>

<div class="callout callout--success">
    <p><strong>Primary advantage of RBFs over binary features</strong> RBFs produce approximate functions that vary smoothly and are differentiable.</p>
</div>

<div class="callout callout--danger">
    <p><strong>Downside to RBF networks</strong> Greater computational complexity and, often, more manual tuning is required before learning is robust and efficient.</p>
</div>

## What's Next?
Next we will discuss about how to select step-size parameters manually for linear SGD and nonlinear function approximation.