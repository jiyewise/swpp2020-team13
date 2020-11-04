from django.shortcuts import render
from django.http import HttpResponse, HttpResponseNotAllowed, HttpResponseBadRequest, JsonResponse
from django.contrib.auth.models import User
from django.views.decorators.csrf import ensure_csrf_cookie
import json
from json import JSONDecodeError
from django.contrib.auth import authenticate, login, logout
from .models import Goal
from django.core.serializers.json import DjangoJSONEncoder
from datetime import datetime
from django.utils import timezone
from django.views.decorators.csrf import csrf_exempt

# Create your views here.
@csrf_exempt
def goalList(request):
    if request.method == 'GET':
        if request.user.is_authenticated is False:
            return HttpResponse(status=401)
        else:
            goal_list = []
            for g in Goal.objects.all():
                created_at = g.created_at.strftime('%Y-%m-%d %H:%M:%S')
                updated_at = g.updated_at.strftime('%Y-%m-%d %H:%M:%S')
                deadline = g.deadline.strftime('%Y-%m-%d %H:%M:%S')

                goal_list.append({'id': g.id, 'title': g.title, 'photo': g.photo, 'user': g.user.id, 'created_at': created_at, 'updated_at': updated_at, 'deadline': deadline})
            return JsonResponse(goal_list, safe=False, status=200)

    elif request.method == 'POST':
        if request.user.is_authenticated is False:
            return HttpResponse(status=401)
        try:
            body = request.body.decode()
            goal_title = json.loads(body)['title']
            goal_photo = json.loads(body)['photo']
            goal_deadline = json.loads(body)['deadline']
            goal_deadline = timezone.make_aware(datetime.strptime(goal_deadline, '%Y-%m-%d %H:%M:%S')) # JSON string for deadline should be '%Y-%m-%d %H:%M:%S'
        except(KeyError, JSONDecodeError) as e:
            print(e)
            return HttpResponseBadRequest()

        new_goal = Goal(title=goal_title, user=request.user, photo=goal_photo, deadline=goal_deadline)

        if 'tags' in json.loads(body): # tags should be added after an intance is created
            tags = json.loads(body)['tags'] # TODO: check that tags is a list
            goal.tags.add(*tags)

        new_goal.save() # goal_created_at and goal_updated_at is made when new goal is saved

        response_dict = {'id': new_goal.id, 'title': new_goal.title, 'photo': new_goal.photo, 'user': new_goal.user.id, 'created_at': (new_goal.created_at).strftime('%Y-%m-%d %H:%M:%S'), 'updated_at' : (new_goal.updated_at).strftime('%Y-%m-%d %H:%M:%S'), 'deadline': (new_goal.deadline).strftime('%Y-%m-%d %H:%M:%S')}
        return JsonResponse(response_dict, status=201, safe=False)
    else:
        return HttpResponseNotAllowed['GET', 'POST']


def goalDetail(request, goal_id=""):
    if request.method == 'GET':
        if request.user.is_authenticated is False:
            return HttpResponse(status=401)
            # GET goal Detail
            for g in Goal.objects.filter(id=goal_id):
                response_dict = {'id': g.id 'title': g.title, 'photo': g.photo, 'user': g.user.id, 'created_at': created_at, 'updated_at': updated_at, 'deadline': deadline}
            return JsonResponse(response_dict, safe=False, status=200)
            
    elif request.method == 'PUT' or request.method == 'PATCH':
        if request.user.is_authenticated is False:
            return HttpResponse(status=401)
        try:
            body = request.body.decode()
            goal_title = json.loads(body)['title']
            goal_photo = json.loads(body)['photo']
        except(KeyError, JSONDecodeError) as e:
            return HttpResponseBadRequest()
        goal = Goal.objects.get(id=goal_id)
        # check if the user is the goal owner
        if goal.user.id is not request.user.id:
            return HttpResponse(status=403)
        # if pass, continue
        goal.title = goal_title
        goal.photo = goal_photo
        goal.save()
        response_dict = {'title': goal.title, 'photo': goal.photo, 'user': goal.user.id, 'created_at': str(goal.created_at), 'updated_at': str(goal.updated_at)}
        return JsonResponse(response_dict, safe=False, status=200)
        
    elif request.method == 'DELETE':
        if request.user.is_authenticated is False:
            return HttpResponse(status=401)
        goal = Goal.objects.get(id=goal_id)
        if goal.user.id is not request.user.id:
            return HttpResponse(status=403)
        goal.delete()
        return HttpResponse(status=200)

    else:
        return HttpResponseNotAllowed['GET', 'PUT', 'PATCH', 'DELETE']

