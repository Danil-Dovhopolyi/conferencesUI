@servers(['web' => 'dovhopolyi-do@isp.groupbwt.com'])

@setup
    $releases_dir = $server_dir . '/releases/' . $remove_dir;
    $app_dir = $server_dir . '/app';
@endsetup

@story('deploy')
    remove_old_releases
    update_symlinks
@endstory

@task('update_symlinks')
    echo 'Linking current release'
    rm -rf {{ $app_dir }}
    ln -s {{ $releases_dir }} {{ $app_dir }}
@endtask

@task('remove_old_releases')
    echo 'Remove OLD release'
    cd {{ $server_dir }}/releases
    rm -rf `ls -t | tail -n +2`
@endtask
