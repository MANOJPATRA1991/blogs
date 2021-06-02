---
# Page settings
title: 1. Eager execution # Define a title of your page
description: Immediate evaluation without building graphs # Define a description of your page
keywords: # Define keywords for search engines
order: 0 # Define order of this page in list of all documentation documents
comments: false # Set to "true" in order to enable comments on this page. Make sure you properly setup "disqus_forum_shortname" variable in "_config.yml"

# Hero section
hero:
    title: Tensorflow Notes
    text: 1. Eager execution
---

# Benefits of eager execution
---

1. Evaluate operations immediately without building graphs
2. Operations return concrete values instead of constructing a computational graph to run later
  * `tf.Tensor` objects reference concrete values instead of symbolic handles to nodes in a computational graph
3. In Tensorflow 2.0, eager execution is enabled by default.
  * `tf.executing_eagerly()` => *True*
4. Eager execution works nicely with NumPy too as NumPy operations accept `tf.Tensor` arguments.
  * `tf.math` operations convert Python objects and NumPy arrays to `tf.Tensor` objects.
  * The `tf.Tensor.numpy` method returns the object's value as a NumPy ndarray.
5. All the functionality of the host language is available while the model is executing
6. Computing gradients eagerly during training using `tf.GradientTape`
  * `tf.GradientTape` can only compute one gradient; subsequent calls throw a runtime error.
7. Use the assert functions in `tf.debugging` to check if a condition holds up - both eager and graph execution.
8. We can call the model even without training and inspect the output in eager execution.

## Variables

`tf.Variable` objects store mutable `tf.Tensor`-like values accessed during training to make automatic differentiation easier. 

Variables persist until the last reference to the python object is removed.

## Object-based saving

A `tf.keras.Model` includes a `save_weights` method to easily create a checkpoint.

Using `tf.train.Checkpoint` we can take full control over this process and restore values from the checkpoint.

## Extras

1. To create a constant, use `tf.constant`.
2. To convert to tensor, use `tf.convert_to_tensor`.