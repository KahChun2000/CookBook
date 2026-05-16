package com.cookbook

import android.os.Build
import android.os.Bundle
import android.view.View
import androidx.core.view.ViewCompat
import androidx.core.view.WindowInsetsCompat

import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled
import com.facebook.react.defaults.DefaultReactActivityDelegate

class MainActivity : ReactActivity() {

  override fun getMainComponentName(): String = "CookBook"

  override fun createReactActivityDelegate(): ReactActivityDelegate =
    DefaultReactActivityDelegate(this, mainComponentName, fabricEnabled)

  override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)

    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q) {
      setupImeInsets()
    }
  }

  private fun setupImeInsets() {
    val rootView = findViewById<View>(android.R.id.content)

    ViewCompat.setOnApplyWindowInsetsListener(rootView) { v, insets ->
      val imeInsets = insets.getInsets(WindowInsetsCompat.Type.ime())
      val systemBarsInsets = insets.getInsets(WindowInsetsCompat.Type.systemBars())

      v.setPadding(
        0,
        0,
        0,
        imeInsets.bottom + systemBarsInsets.bottom
      )

      insets
    }
  }
}