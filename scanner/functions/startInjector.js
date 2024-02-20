function startInjector() {
  inject(function (_$rootScope_, _$q_, _$timeout_, _$httpBackend_, _DS_, _$log_, _DSUtils_, _DSHttpAdapter_) {
    // Setup global mocks

    localStorage.clear()
    $q = _$q_
    $rootScope = _$rootScope_
    DS = _DS_
    $timeout = _$timeout_
    DSUtils = _DSUtils_
    DSHttpAdapter = _DSHttpAdapter_
    $httpBackend = _$httpBackend_
    Post = DS.defineResource({
      name: 'post',
      keepChangeHistory: true,
      endpoint: '/posts'
    })
    User = DS.defineResource({
      name: 'user',
      relations: {
        hasMany: {
          comment: {
            localField: 'comments',
            foreignKey: 'approvedBy'
          }
        },
        hasOne: {
          profile: {
            localField: 'profile',
            foreignKey: 'userId'
          }
        },
        belongsTo: {
          organization: {
            parent: true,
            localKey: 'organizationId',
            localField: 'organization'
          }
        }
      }
    })

    Organization = DS.defineResource({
      name: 'organization',
      relations: {
        hasMany: {
          user: {
            localField: 'users',
            foreignKey: 'organizationId'
          }
        }
      }
    })

    Profile = DS.defineResource({
      name: 'profile',
      relations: {
        belongsTo: {
          user: {
            localField: 'user',
            localKey: 'userId'
          }
        }
      }
    })

    Comment = DS.defineResource({
      name: 'comment',
      relations: {
        belongsTo: {
          user: [
            {
              localField: 'user',
              localKey: 'userId'
            },
            {
              parent: true,
              localField: 'approvedByUser',
              localKey: 'approvedBy'
            }
          ]
        }
      }
    })
    $log = _$log_

    lifecycle.beforeValidate.callCount = 0
    lifecycle.validate.callCount = 0
    lifecycle.afterValidate.callCount = 0
    lifecycle.beforeCreate.callCount = 0
    lifecycle.afterCreate.callCount = 0
    lifecycle.beforeUpdate.callCount = 0
    lifecycle.afterUpdate.callCount = 0
    lifecycle.beforeDestroy.callCount = 0
    lifecycle.afterDestroy.callCount = 0
    lifecycle.beforeInject.callCount = 0
    lifecycle.afterInject.callCount = 0
    lifecycle.serialize.callCount = 0
    lifecycle.deserialize.callCount = 0
    lifecycle.queryTransform.callCount = 0

    p1 = { author: 'John', age: 30, id: 5 }
    p2 = { author: 'Sally', age: 31, id: 6 }
    p3 = { author: 'Mike', age: 32, id: 7 }
    p4 = { author: 'Adam', age: 33, id: 8 }
    p5 = { author: 'Adam', age: 33, id: 9 }

    user1 = {
      name: 'John Anderson',
      id: 1,
      organizationId: 2
    }
    organization2 = {
      name: 'Test Corp 2',
      id: 2
    }
    comment3 = {
      content: 'test comment 3',
      id: 3,
      userId: 1
    }
    profile4 = {
      content: 'test profile 4',
      id: 4,
      userId: 1
    }

    comment11 = {
      id: 11,
      userId: 10,
      content: 'test comment 11'
    }
    comment12 = {
      id: 12,
      userId: 10,
      content: 'test comment 12'
    }
    comment13 = {
      id: 13,
      userId: 10,
      content: 'test comment 13'
    }
    organization14 = {
      id: 14,
      name: 'Test Corp'
    }
    profile15 = {
      id: 15,
      userId: 10,
      email: 'john.anderson@test.com'
    }
    user10 = {
      name: 'John Anderson',
      id: 10,
      organizationId: 14,
      comments: [
        comment11,
        comment12,
        comment13
      ],
      organization: organization14,
      profile: profile15
    }
    user16 = {
      id: 16,
      organizationId: 15,
      name: 'test user 16'
    }
    user17 = {
      id: 17,
      organizationId: 15,
      name: 'test user 17'
    }
    user18 = {
      id: 18,
      organizationId: 15,
      name: 'test user 18'
    }
    organization15 = {
      name: 'Another Test Corp',
      id: 15,
      users: [
        user16,
        user17,
        user18
      ]
    }
    user19 = {
      id: 19,
      name: 'test user 19'
    }
    user20 = {
      id: 20,
      name: 'test user 20'
    }
    comment19 = {
      content: 'test comment 19',
      id: 19,
      approvedBy: 19,
      approvedByUser: user19,
      userId: 20,
      user: user20
    }
    user22 = {
      id: 22,
      name: 'test user 22'
    }
    profile21 = {
      content: 'test profile 21',
      id: 21,
      userId: 22,
      user: user22
    }
  })
}