---
# Page settings
title: On Policy Prediction with Approximation - Part 1 # Define a title of your page
description: Approximate Solution Methods  # Define a description of your page
keywords: Reinforcement Learning # Define keywords for search engines
order: 1 # Define order of this page in list of all documentation documents
comments: false # Set to "true" in order to enable comments on this page. Make sure you properly setup "disqus_forum_shortname" variable in "_config.yml"

# Hero section
hero:
    title: Reinforcement Learning Notes
    text: <h3>Approximate Solution Methods</h3>On Policy Prediction with Approximation
---

## Introduction

Approximate value function is a parameterized functional form of state $$s$$ with weight vector $$\mathbf{w} \in \mathbb{R}^d$$ where $$d$$ is the number of weights.

$$
    \hat{v}(s, \mathbf{w}) \approx v_\pi(s)
$$

Typically, $$ d << \vert\mathcal{S}\vert $$, where $$\vert\mathcal{S}\vert$$ is the number of states.

Changing one weight changes the estimated value of many states <=> When a single state is updated, the change generalizes from that state to affect the values of many other states.

Function approximation makes reinforcement learning applicable to partially observable problems where the full state is not available to the agent.

## Value Function Approximation

Unlike MC, TD(0), n-step TD or DP, where we update the value of a state $$s$$ to be more like the update target $$u$$, i.e., $$ s \mapsto u $$ keeping the estimated values of all other states unchanged; in value function approximation updating at s generalizes so that the estimated values of many other states are changed as well.

INPUT: $$ s \mapsto g $$ of each update as a training example

OUTPUT: approximate function

Reinforcement learning generally requires function approximation methods able to handle nonstationary target functions (target functions that change over time).

<div class="callout callout--danger">
    <p>Methods that cannot easily handle such nonstationarity are less suitable for reinforcement learning.</p>
</div>

## The Prediction Objective ($$\overline{VE}$$)

$$
    \overline{VE}(\mathbf{w}) \doteq \sum_{s \in \mathcal{S}}\mu(s)[v_\pi(s) - \hat{v}(s, \mathbf{w})]^2
$$

where $$\mu(s)$$ represents how much we care about the error in each state $$s$$; $$\mu(s) \geq 0$$ and $$\sum_s\mu(s) = 1$$.

<div class="callout callout--info">
    <p>Often, μ(s) is chosen to be the fraction of time spent in s.</p>
</div>

Under on-policy training this is called the *on-policy distribution*.

In continuing tasks, the on-policy distribution is the stationary distribution under $$\pi$$.

### The on-policy distribution in episodic tasks

$$h(s) \rightarrow$$ the probability that an episode begins in each state $$s$$

$$\eta(s) \rightarrow$$ the number of timesteps spent, on average, in state $$s$$ in a single episode

With discounting $$(\gamma < 1)$$ leading to termination,

$$
    \eta(s) = h(s) + \gamma\sum_s\eta(\overline{s})\sum_a \pi(a\vert\overline{s})p(s\vert\overline{s},a) \hspace{0.5cm} \forall s \in \mathcal{S}
$$

and 

$$
    \mu(s) = \frac{\eta(s)}{\sum_{s^\prime}\eta(s^\prime)} \hspace{0.5cm} \forall s \in \mathcal{S}
$$

### Ideal goal in terms of $$\overline{VE}$$

To find a better policy, our goal should be to find a global optimum, a weight vector $$\mathbf{w}^* $$ for which $$\overline{VE}(\mathbf{w}^*) < \overline{VE}(\mathbf{w})$$ for all possible $$\mathbf{w}$$.

While reaching this goal is sometimes possible for simple function approximators such as linear ones, but is rarely possible for complex function approximators such as ANNs and decision trees, for complex function approximators, the goal would be to converge instead to a local optimum, a weight vector $$\mathbf{w}^* $$ for which $$\overline{VE}(\mathbf{w}^*) < \overline{VE}(\mathbf{w})$$ for all $$\mathbf{w}$$ in some neighborhood of $$\mathbf{w}$$.

## What's Next?

Next we look into function approximation methods based on gradient principles, and on linear gradient-descent methods in particular.