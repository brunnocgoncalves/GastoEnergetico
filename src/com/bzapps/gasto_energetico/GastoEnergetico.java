
package com.bzapps.gasto_energetico;

import android.os.Bundle;
import org.apache.cordova.*;

public class GastoEnergetico extends DroidGap
{
    @Override
    public void onCreate(Bundle savedInstanceState)
    {
        super.onCreate(savedInstanceState);
        super.loadUrl("file:///android_asset/www/index.html");
    }
}