from django.urls import path
from . import views
from django.views.generic import TemplateView


urlpatterns = [


    path('recognize_and_speak/', views.recognize_and_speak,
         name='recognize_and_speak'),

    path("", TemplateView.as_view(template_name="base.html")),
]
